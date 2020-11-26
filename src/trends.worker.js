import Url from 'url-parse';
import { validators } from './libs/pii.js';
import { hasVideo } from './libs/videos.js';
import { getLocation } from './libs/locations.js';
import { getQuery, getParams, getPath } from './libs/queries.js';
import { getSocials, checkAccount } from './libs/socials.js';
import { scaleLinear } from 'd3';
import { trendCounter } from './libs/trend.counter.js';
const PIIs = Object.entries(validators).map(e => {
  return {
    type : e[0],
    test : e[1]
  }
});

function getDomain(d) {
  // compasate for .co.uk type of domains
  let x = (d.length - d.indexOf('.co.') === 6) ? -3 : -2;
  return d.split('.').slice(x).join('.');
}


onmessage = function(e) {
	let domains = {};
  let videos = [];
  let totals = {
    visits : 0,
    count : 0,
    from: (new Date()).valueOf(),
    to: 0
  }
  let leaks = [];
  let locations = [];
  let unsecure = {};
  let uniquePIIs = [];
  let queries = [];
  let socials = [];


	if( e.data) {
    const scale = scaleLinear().domain([0,e.data.d.length]).range([0,100]);
    let progress = 0;
		// map visits to urls
		e.data.d.forEach((h, index) => {


      // split url to components
			const parsed = new Url(h.url);

			h.hostname = parsed.hostname;
			h.query = (parsed.query != '') ? parsed.query : null;
			h.pathname = (parsed.pathname != '/') ? parsed.pathname : null;
			h.protocol = parsed.protocol;
			h.password = parsed.password;
			h.username = parsed.username ;
			h.port = parsed.port ;
			h.origin = parsed.origin ;
      h.hash = parsed.hash;
			h.datetime = new Date(h.time);
			h.domain = getDomain(parsed.hostname);


      // update totals
      totals.count++;

      // count time trends
      trendCounter(totals, h, {
        timestamp : 'time',
        date: 'datetime'
      });


      // test urls against PII regexps
      PIIs.forEach(PII => {
        let leaked =  PII.test.exec(h.url);

        if (leaked && uniquePIIs.indexOf(h.domain+leaked[0]) < 0) {
          uniquePIIs.push(h.domain+leaked[0]);
          leaks.push({
            domain: h.domain,
            protocol: h.protocol,
            title: h.title,
            leak: leaked[0],
            type: PII.type,
            url: h.url,
            datetime : h.datetime
          });
        }
      });

      // add username and passwords in urls to leaks
      if(h.username || h.password) leaks.push({
        domain: h.domain,
        title: h.title,
        leak: h.username + ':' + h.password,
        type: 'PASSWORD',
        url: h.url,
        datetime : h.datetime
      });


      //  detect and collect maps and lat/lon coordinates
      h.location = getLocation(h);

      if (h.location) locations.push(h);

      // list http only sites
      if (h.protocol == 'http:') {
        if (!unsecure[h.domain]) unsecure[h.domain] = {
          domain: h.domain,
          urls : []
        }
        unsecure[h.domain].urls.push(h);
      }


      h.params = getParams(h.query);
      h.path = getPath(h.pathname);

      h.query = getQuery(h);

      if (h.query) queries.push(h);

      getSocials(h, socials);


      // detect and collect videos
      h.video = hasVideo(h);
      if(h.video) videos.push(h);


			// calculate domain visit totals
			if (!domains[h.domain]) domains[h.domain] = {
				domain: h.domain,
				count: 0,
				visits: [],
        from: (new Date()).valueOf(),
        to: 0,
				subdomains : {},
        accounts: []
			};

      // check accounts for domain
      checkAccount(domains, h);

      // count time trends
      trendCounter(domains[h.domain], h, {
        timestamp : 'time',
        date: 'datetime'
      });

      // count visits total
			domains[h.domain].count++;

      // reference visits to each domain
			domains[h.domain].visits.push(h);


			if (!domains[h.domain].subdomains[h.hostname]) domains[h.domain].subdomains[h.hostname] = {
				hostname: h.hostname,
				count: 0
			};
			domains[h.domain].subdomains[h.hostname].count++;

      if (progress != scale(index).toFixed(0)) {
        progress = scale(index).toFixed(0);
        postMessage({
          status : 'progress',
          progress,
        });
      }

			return h;
		});

    postMessage({
      status : 'done',
      progress: 100,
      data: {
        domains,
        totals,
        leaks,
        locations,
        videos,
        queries,
        socials,
        unsecure : Object.entries(unsecure).map(e => e[1])
      }
    });
  }
}
