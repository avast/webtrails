import { writable, derived } from 'svelte/store';
import Url from 'url-parse';
import { WorkerPromise } from './libs/worker';

import history from './chrome/history.js';


history().then(d => sources.set({ d }));

export const trendsProgress = writable(0);

export const sources = writable(null);

export const trends = derived(sources, $sources => {
	return new Promise(function(res, rej){
		if($sources) {
			WorkerPromise(chrome.runtime.getURL('trends.worker.js'), $sources)
				.on('progress', trendsProgress.set)
				.then(res);
		}
	});
})
