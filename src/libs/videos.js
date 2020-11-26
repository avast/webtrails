import { JSONPath } from 'jsonpath-plus';
import getVideoId from  'get-video-id';

// TODO watch
// https://www.facebook.com/watch/?v= [id]
// https://m.facebook.com/watch/?v=  [id]
//
const sites = {
  "facebook.com" : {
    "$..path[0]" : ["watch"]
  },
  "netflix.com" : {
    "$..path[0]": ["title"],
  },
  "hbogo.cz" : {
    "$..path[0]" : ["filmy", "serialy"],
    "$..path[1]" : ["filmy", "serialy"]
  }
}
export function hasVideo (url) {
  let res = getVideoId(url.url);

  if (!res.id && sites[url.domain]) {
    let rules = Object.keys(sites[url.domain]);
    for(let i=0; i<rules.length; i++){
      let r = JSONPath(rules[i], [url]);

      if (r.length > 0 && sites[url.domain][rules[i]].indexOf(r[0]) > -1) {
        res = {
          id : url.path[1],
          service : url.domain
        }
      }
    }
  } else {
    res.service = checkServiceName(res.service, url.domain);
  }

  return (!res.id) ? null : res;
}


function checkServiceName (service, domain){

  if (service == 'youtube') return 'youtube.com';


  return domain;
}
