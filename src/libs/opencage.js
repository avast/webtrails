const STORAGE_REVERSE = 'OPENCAGE_CACHE_REVERSE';

let localStorageReverse = localStorage.getItem(STORAGE_REVERSE) || '{}';

let CACHE_REVERSE = JSON.parse(localStorageReverse);

const apikey = 'YOUR_OPENCAGE_API_KEY';

const api_url = 'https://api.opencagedata.com/geocode/v1/json'

export function reverse(latitude, longitude, address){

  return new Promise(function(resolve, reject){

    const request_url = api_url
     + '?'
     + 'key=' + apikey
     + '&q=' + encodeURIComponent(latitude + ',' + longitude)
     + '&pretty=1'
     + '&no_annotations=1';

    if (CACHE_REVERSE[latitude + ',' + longitude]) {
      resolve((address)
        ? CACHE_REVERSE[latitude + ',' + longitude].results[0].formatted
        : CACHE_REVERSE[latitude + ',' + longitude]);

      return;
    };

    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward


    const request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = function() {
     // see full list of possible response codes:
     // https://opencagedata.com/api#codes

     if (request.status == 200){
    	 // Success!
    	 const data = JSON.parse(request.responseText);
       if (!CACHE_REVERSE[latitude + ',' + longitude]) {
         CACHE_REVERSE[latitude + ',' + longitude] = data;
         localStorage.setItem(STORAGE_REVERSE, JSON.stringify(CACHE_REVERSE));
       }

    	 resolve((address)
        ? data.results[0].formatted
        : data);

     } else if (request.status <= 500){
    	 // We reached our target server, but it returned an error

    	 console.log("unable to geocode! Response code: " + request.status);
    	 const data = JSON.parse(request.responseText);
    	 console.log(data.status.message);
       reject(data.status.message)
     } else {
    	 console.log("server error");
     }
    };

    request.onerror = function() {
     // There was a connection error of some sort
     console.log("unable to connect to server");
     reject('connection error')
    };

    request.send();  // make the request

  });
}
