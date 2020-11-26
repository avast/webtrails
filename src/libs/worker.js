import  EventEmitter  from 'events';
export default Worker;

export function inlineWorker (js) {
  console.log('WTF');
  let bb = new BlobBuilder();
  bb.append(js);
  return new Worker(URL.createObjectURL(bb.getBlob()));
}

const testURL = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

// runs string of code or url inside
export function WorkerPromise (js, params) {
  const events = new EventEmitter();
  const promise =  new Promise(function (res, rej){

    let worker = js.match(testURL) ? new Worker(js) : inlineWorker(js);
    worker.onmessage = function(event) {

      if (event.data.status == 'progress') promise.emit('progress', event.data.progress)
      if (event.data.status == 'done') {
        worker.terminate();
        res(event.data.data);
      }
    };
    worker.postMessage(params);

  });

  promise.on = events.on;
  promise.emit = events.emit;

  return promise;
}
