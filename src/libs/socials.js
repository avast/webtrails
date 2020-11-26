import { JSONPath } from 'jsonpath-plus';
import accounts from '../config/account.json';
import socialSites from '../config/socials.json';
//import favorites from '../config/social.favorites.json';



export function getSocials(url, socials = []) {
  url.social = (socialSites.indexOf(url.domain) > -1);
  if (url.social) socials.push(url);
  return socials;
}

function cleanString(string, cleaners =[]) {
  cleaners.forEach(c => {
    string = string.replace(c, '');
  })
  return string;
}

export function checkAccount(domains, url){
  // check if rule exists and ignore if account was already found
  if (accounts[url.domain]) {
    // apply match rules to detect, that user is in account space
    if (domains[url.domain].accounts.length == 0 && accounts[url.domain].match) {
      for (const path in accounts[url.domain].match) {
        const matcher = accounts[url.domain].match[path];
        const value = JSONPath({
          path,
          json: url
        });
        // match json path results to provided rules
        if (value.length > 0) {
          for (let i=0; i < value.length; i++){
            if(Array.isArray(matcher)){
              if (matcher.indexOf(value[i]) > -1) domains[url.domain].accounts.push(true);
              break;
            } else if(matcher == value[i]) {
              domains[url.domain].accounts.push(true);
              break;
            }
          }
        }
      }
    }
    // attempt to locate account ids/emails/names
    if(accounts[url.domain].account) {
      accounts[url.domain].account.forEach(function(path){
        const value = JSONPath({
          path,
          json: [url]
        });
        let account = decodeURIComponent(value[0]);
        if (accounts[url.domain].accountCleaner) account = cleanString(account, accounts[url.domain].accountCleaner);
        if (value.length > 0 && domains[url.domain].accounts.indexOf(account) == -1) {
          domains[url.domain].accounts.push(account);
          if (domains[url.domain].accounts[0] === true) domains[url.domain].accounts.shift();
        }
      });
    }
  }
  return domains;
}






export const interests = {
	'facebook.com' : [
		{
			name : 'Top events',
			exclude : {
				1 : ['email' ,'join_near_by']
			},
			meta : ['title', 'views'],
			match: [0, 'events'],
			group : 1,
			title: 'title',
			titleIgnore : ['Facebook'],
			titleRegex : /(?:\(\d.*\) )?(.*)/gm
		},
		{
			name : 'Top views',
			meta : ['title', 'views'],
			exclude : {
				0 : ['photo.php', 'l.php', 'home.php', 'notifications.php', 'story.php',
					'login', 'events', 'groups', 'messages', 'pages', 'docs', 'developer',
					'settings', 'photo', 'n', 'watch', 'pg', 'marketplace', 'permalink.php',
					'support', 'sharer', 'all4', 'donate', 'help', 'stories', 'friends',
					'messenger', 'public', 'policies'],
				1: ['dialog']
			},
			group: 0,
			title: 0
		},
		{
			name : 'Top views',
			meta : ['title', 'views'],
			match: [0, 'pages'],
			group: 1,
			title: 1
		},
		{
			name : 'Top views',
			meta : ['title', 'views'],
			match: [0, 'pg'],
			group: 1,
			title: 1
		}/*,
    {
      name : 'Visited Links',
      meta : ['title', 'views'],
      match: [0, 'l.php'],
      query: 'u'
      title: '' // query param u with decodeURIComponent
    }*/
	],
	'twitter.com' : [
		{
			name : 'Favorite posters',
			meta : ['title', 'views'],
			exclude : {
				0 : ['home', 'compose', 'hashtag', 'search', 'i', 'settings']
			},
			group: 0,
			title : 0
		}
	],
	'medium.com' : [
		{
			name : 'Top authors',
			meta : ['title', 'reads'],
			exclude : {
				0 : ['feed', 'm']
			},
			group: 0,
			title : 0
		}
	],
	'instagram.com' : [
		{
			name : 'Top pages',
			meta : ['title', 'views'],
			exclude : {
				0 : ['p'],
				'hostname' : 'help.instagram.com'
			},
			group: 0,
			title : 'title',
			titleReplace : ' • Instagram photos and videos'
		}
	],
	'linkedin.com' : [
		{
			name : 'Top profile visits',
			meta : ['title', 'views'],
			match: [0, 'in'],
			group: 1,
			title : 'title',
			titleReplace:  ' | LinkedIn',
			titleIgnore : ['', 'LinkedIn', 'undefined'],
			titleRegex : /(?:\(\d.*\) )?(.*)/gm
		}
	],
	'reddit.com' : [
		{
			name : 'Favorite groups',
			meta : ['title', 'views'],
			exclude : {
				0 : ['help']
			},
			match: [0, 'r'],
			group: 1,
			title : 1,
		}
	]
}


function excludePath(exclude, s) {
	for (let index in exclude) {
		if (typeof index == 'string' && s[index] == exclude[index]) return true;
		else if( exclude[index].indexOf(s.path[index]) > -1 ) return true;
	}
	return false;
}



export function applyRules (topItems,  s) {
  if (interests[s.domain] && s.path.length > 0) {
    const rules = interests[s.domain];

  	for(let i=0, l=rules.length; i<l; i++){
  		let rule = rules[i];

  		// do not apply if match rule does not match
  		if (rule.match) {
  			if (s.path[rule.match[0]] != rule.match[1]) continue;
  		}

  		// do no apply if it is in exclude rule
  		if (rule.exclude) {
  			if (excludePath(rule.exclude, s)) continue;
  		}

  		// no group id in url
  		if (!s.path[rule.group]) continue

  		// read and decode id and title
  		let id  = s.path[rule.group];
  		let title = s.title;

  		try {
  			id = decodeURIComponent(s.path[rule.group]);
  			title = (typeof rule.title == 'string' && s[rule.title]) ? s[rule.title] : decodeURIComponent(s.path[rule.title]);
  		} catch(e) {
  			continue;
  		}

  		if (rule.titleIgnore && rule.titleIgnore.indexOf(title) > -1) title = undefined;


  		// clear titles for unneccessary strings
  		if (title && rule.titleReplace) title = title.replace(rule.titleReplace, '');

  		if (title && rule.titleRegex) {
  			let match = (new RegExp(rule.titleRegex)).exec(title);
  			if (match && match[1] && match[1] != '') title = match[1];
  		}

  		// create groups if needed
  		if(!topItems[s.domain]) topItems[s.domain] = {};
  		if(!topItems[s.domain][rule.name]) topItems[s.domain][rule.name] = {};
  		if(!topItems[s.domain][rule.name][id]) topItems[s.domain][rule.name][id] = {
  			id,
  			title,
  			meta : rule.meta,
  			urls : [],
  			size : 0
  		}
  		// add reference
  		if (!topItems[s.domain][rule.name][id].title && title) topItems[s.domain][rule.name][id].title = title;
  		topItems[s.domain][rule.name][id].urls.push(s);
  		topItems[s.domain][rule.name][id].size++;
  	}
  }
  return topItems;
}
