import { writable, readable, derived } from 'svelte/store';
import history from './chrome/history.js';
//import browser, { getActiveTabFull } from './browser.js';


history().then(console.log);
export const sources = writable(null);
/*
chrome.history.search({
  text : '',
  startTime: 0,
  maxResults: 0
}, function(items){
  console.log('Items', items);
  let l = items.length;
  let visits = [];
  items.forEach(item => {
    chrome.history.getVisits({
      url : item.url
    }, function (visitsForItem) {
      visits = visits.concat(visitsForItem);
      l--;
      if(l == 0 ) console.log('Visits', visits);
    });
  });
});

*/

/*
export const tab = readable(null, set => {
  function update() {
    getActiveTabFull().then(set);
  }
  browser.on('tab.close', update);
  browser.on('cookie.remove', update);
  update();
});
*/
