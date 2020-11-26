<script>

import { trends } from './store.js';
import { scaleLinear, max } from 'd3';
import colors from './config/colors.json';
import RadialBarChart from './Charts/RadialBarChart.svelte';
import ListChart from  './Charts/ListChart.svelte';
import TimeOfDay from './Charts/TimeOfDay.svelte';
import DaysOfWeek from './Charts/DaysOfWeek.svelte';
import LineChart from './Charts/LineChart.svelte';
import WordCloud from './Charts/WordCloud.svelte';
import { trendCounter } from './libs/trend.counter.js';
import Nodata from './components/Nodata.svelte';


let queries = [];
let topsites = {};
let topsitesChart = [];
let topsitesTotal = 0;
let keywords = null;
let phrases = null;
let phrasesScale = null;

let timeTrends = null;
let timeTrendsCache = {}

const common = "vs,poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";


trends.subscribe(value => {
	value.then(res => {

		queries = res.queries;
		topsitesTotal = queries.length;

		// map top search sites
	  queries.forEach(q => {

			trendCounter(timeTrendsCache, q, {
        timestamp : 'time',
        date: 'datetime'
      });

      if (!topsites[q.domain]) topsites[q.domain] = [];
      topsites[q.domain].push(q);
    });
		timeTrends = timeTrendsCache;

		let full_queries = {};
		// find top keywords
		keywords = Object.entries(queries.reduce((keywords, q) => {
			//record full queires
			if (!full_queries[q.query]) full_queries[q.query] = 0;
			full_queries[q.query]++;

			// manage each keyword
			let query = q.query.split(' ');

			query.forEach(word => {
				// filter short and numbers
				if (word.length > 1 && common.indexOf(word) == -1 && parseInt(word) != word) {
					if (!keywords[word]) keywords[word] = 0;
					keywords[word]++;
				}
			});
			return keywords;
		}, {}))
		// map keywords to array, sort by value and cut to 100
		.map(entry => {
			return {
				text: entry[0],
				value: entry[1]
			}
		})
		.sort((a, b) => {
			return b.value - a.value;
		})
		.slice(0,100);

		// map phrases to array, sort by value and cut to 100
		phrases = Object.entries(full_queries).map(entry => {
			return {
				title: entry[0],
				value: entry[1]
			}
		})
		.sort((a, b) => {
			return b.value - a.value;
		})
		.slice(0,100);

		phrasesScale = scaleLinear()
			.domain([0,max(phrases, d => d.value)])
			.range([0, 30]);


		// parse data for arc chart
		topsitesChart = Object.entries(topsites).map(entry => {
			return {
				id: entry[0],
				value: entry[1].length,
				color : colors[entry[0]] || '#666'
			};
		});


  });
});



</script>

{#if queries.length == 0}
	<Nodata />
{:else}

	<div class="panel-overview">
		<div class="panel-highlights">
		<h3>Trend</h3>
		<p>There is time to read and time to search. What are you peak search times?</p>
		{#if timeTrends}
				<h5>Overall trend</h5>
				<LineChart data={timeTrends.frequencyByDay} height="7" />
				<h5>Active hours</h5>
				<TimeOfDay data={timeTrends.frequencyByHour} height="3" showAverage={false} />
				<h5>Active days</h5>
				<DaysOfWeek data={timeTrends.frequencyByWeekday} height="2" showAverage={false} />
		{/if}

		</div>
		<div class="panel-topratios">
			<h3>Search engine usage</h3>
			<RadialBarChart data={topsitesChart.slice(0,5)} />
		</div>
	</div>



	<h3>Top searched keywords</h3>
	<p>These are your most frequented keywords when searching the web. What do they say about your interests?</p>
	<WordCloud data={keywords} />

	<h3>Top search phrases</h3>
	<p>Find out your the most searched phrases. Did you find what you were looking for?</p>
	{#if phrases && phrasesScale}
		<ListChart items={phrases} quant="value" showHeader={false} />
	{/if}

{/if}

<style>
.phrase {
	width: 100%;
	position: relative;
	padding-left: calc(30% + 1rem);
	line-height: 1.5rem;
}
.phraseRatio {
	position: absolute;
	top: 50%;
	right: 70%;
	transform: translateY(-50%);
	background: var(--highlight-2-2);
	border-radius: 5px;
	height: .5rem;
	margin: .1rem 0;
}
.count {
	display: inline-block;
	color: #FFF;
	background: var(--highlight-2-2);
	border-radius: 1rem;
	padding: .1rem .5rem ;
	margin: .1rem 1rem .1rem 0;
}
</style>
