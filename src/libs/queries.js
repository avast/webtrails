import { getPath, getParams } from './urlparser.js';

const TESTS = [
  {
    hostname : 'google.com',
    param : 'q'
  },
  {
    hostname : 'bing.com',
    param : 'q'
  },
  {
    hostname : 'seznam.cz',
    param : 'q'
  },
  {
    hostname : 'zoznam.sk',
    param : 'q'
  },
  {
    hostname : 'centrum.cz',
    param : 'q'
  },
  {
    hostname : 'duckduckgo.com',
    param : 'q'
  },
  {
    hostname : 'amazon.com',
    param : 'k'
  },
  {
    hostname : 'seznam.cz',
    param : 'q'
  },
  {
    hostname : 'baidu.com',
    param : 'wd'
  },
  {
    hostname : 'wolframalpha.com',
    param : 'i'
  },
  {
    hostname : 'yandex.ru',
    param : 'text'
  },
  {
    hostname : 'ask.com',
    param : 'q'
  },
  {
    hostname : 'aol.com',
    param : 'q'
  },
  {
    hostname : 'archive.org',
    param : 'query'
  },
  {
    hostname : 'stackoverflow.com',
    param : 'q'
  }
];


export { getPath, getParams };

export function getQuery(url) {
  for(let i=0, l=TESTS.length; i<l; i++){
    if (url.hostname.indexOf(TESTS[i].hostname) > -1) {
      if (url.params[TESTS[i].param]&& url.params[TESTS[i].param][0] && url.params[TESTS[i].param][0] != '') {
        return decodeURIComponent(url.params[TESTS[i].param][0].replace(/\+/gm, ' '));
      }
    }
  }
  return null;
}
