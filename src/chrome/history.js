

export const deleteAll = function () {
  return new Promise(function(resolve, reject){
    chrome.history.deleteAll(function(){
      resolve();
    })
  });
}





function loop(fn)
{
    return fn().then(val => (val === true && loop(fn)) || val);
}

export default function(options = {}) {

  return new Promise(function(resolve, reject){

    chrome.history.search({
      text : '',
      startTime: 0,
      maxResults: 0
    }, function(items){

      let l = items.length;
      let visits = [];
      items.forEach(item => {
        chrome.history.getVisits({
          url : item.url
        }, function (visitsForItem) {
          visitsForItem.forEach(visit => {
            visits.push({
              id: visit.visitId,
              url: item.url,
              time: visit.visitTime,
              title: item.title
            });
          });
          l--;
          if(l == 0 ) {
            resolve(visits);
          }
        });
      });

    });

  });

}
