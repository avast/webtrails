const empty = {};
export function getParams (queryString) {
   if (!queryString) return empty;

   let keyValPairs = [];
   const params      = {};
   queryString     = queryString.replace(/.*?\?/,"");

   if (queryString.length)
   {
      keyValPairs = queryString.split('&');
      for (const pairNum in keyValPairs)
      {
         const key = keyValPairs[pairNum].split('=')[0];
         if (!key.length) continue;
         if (typeof params[key] === 'undefined')
         params[key] = [];
         params[key].push(keyValPairs[pairNum].split('=')[1]);
      }
   }
   return params;
}


export function getPath(path) {
  if(!path) return [];

  let p = path.split('/');
  if (p[0] == '') p.shift();
  if (p[p.length-1] == '') p.pop();
  return p;
}

export function getHash(hash) {
  if(!hash) return [];
  return getPath(hash.replace('#', ''));
}
