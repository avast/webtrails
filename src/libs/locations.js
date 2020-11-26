

const TESTS = [
  {
    hostname : 'google.com',
    test : /\@([-?\d\.]*)\,([-?\d\.]*)/gm,
    reverse : false
  },
  {
    hostname : 'google.com',
    test : /ll=([-?\d\.]*)\,([-?\d\.]*)/gm,
    reverse : false
  },
  {
    hostname : 'mapy.cz',
    test: /x=([-?\d\.]*)\&y=([-?\d\.]*)/gm,
    reverse : true
  },
  {
    hostname : 'here.com',
    test: /map=([-?\d\.]*)\,([-?\d\.]*)/gm,
    reverse : false
  },
  {
    hostname : 'bing.com' ,
    test: /cp=([-?\d\.]*)\~([-?\d\.]*)/gm,
    reverse : false
  },
  {
    hostname: 'openstreetmap.org',
    test : /map=(?:[-?\d\.]*)\/([-?\d\.]*)\/([-?\d\.]*)/gm,
    reverse : false
  }
];


export function getLocation(url) {
  for(let i=0, l=TESTS.length; i<l; i++){
    if (url.hostname.indexOf(TESTS[i].hostname) > -1) {
      let res = TESTS[i].test.exec(url.url);
      if (res) {
        return {
          service: TESTS[i].hostname,
          lat: parseFloat((TESTS[i].reverse) ? res[2] : res[1]),
          lon: parseFloat((TESTS[i].reverse) ? res[1] : res[2])
        }
      }
    }
  }
  return null;
}
