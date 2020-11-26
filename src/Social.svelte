<script>

import { trends } from './store.js';
import colors from './config/colors.json';

import RadialBarChart from './Charts/RadialBarChart.svelte';
import ListChart from  './Charts/ListChart.svelte';
import TimeOfDay from './Charts/TimeOfDay.svelte';
import DaysOfWeek from './Charts/DaysOfWeek.svelte';
import LineChart from './Charts/LineChart.svelte';
import SiteCard from './Charts/SiteCard.svelte';
import Nodata from './components/Nodata.svelte';
import { trendCounter } from './libs/trend.counter.js';
import { applyRules} from './libs/socials.js';

let socials = [];
let topSites = {};
let topSitesList = [];
let topItems = {};
let timeTrends = null;
let timeTrendsCache = {};



trends.subscribe(value => {
	value.then(res => {

		socials = res.socials;
		let topSitesCache = {};

		socials.forEach(s => {

			trendCounter(timeTrendsCache, s, {
        timestamp : 'time',
        date: 'datetime'
      });


			if (!topSitesCache[s.domain]) topSitesCache[s.domain] = {
				id: s.domain,
				urls : [],
				size: 0
			};
			topSitesCache[s.domain].urls.push(s);
			topSitesCache[s.domain].size++;
			topSitesCache[s.domain].accounts = res.domains[s.domain].accounts;


			trendCounter(topSitesCache[s.domain], s, {
        timestamp : 'time',
        date: 'datetime'
      });

			applyRules(topItems, s);
		});

		topSites = topSitesCache;
		timeTrends = timeTrendsCache;

		for (let site in topItems) {
			for (let group in topItems[site]) {
				topItems[site][group] = Object.entries(topItems[site][group])
					.map(entry => entry[1])
					.sort((a ,b) => b.size - a.size);
			}
		}

		topSitesList = Object.entries(topSites).map(entry => {
			return {
				id: entry[0],
				value: entry[1].urls.length,
				items: entry[1],
				color : colors[entry[0]] || '#666'
			};
		})
		.sort((a, b) => b.value - a.value);
	});
});


</script>

{#if socials.length == 0}
	<Nodata />
{:else}

	<h3>Top services used</h3>
	<p>
	We have detected that throughout your history, you have used some of the following social services.
	For some we have been able to detect used account.
	</p>
	<div class="sites stacked">
		{#each Object.keys(topSites).sort((a, b) => topSites[b].size - topSites[a].size).slice(0,10).reverse() as site}
			<SiteCard site={topSites[site]} />
		{/each}
	</div>

	<div class="panel-overview">
		<div class="panel-highlights">
		<h3>Trend</h3>
		<p>Find out the peak times you use social networks.</p>
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
			<h3>Top social sites</h3>
			<p>Compare the top networks you use by number of visits.</p>
			<RadialBarChart data={topSitesList.slice(0,5)} />
		</div>

	</div>


	<h3>Favorites</h3>
	<p>What are you favorite topics, events? How are you frequented friends and posters?</p>
	<div class="top-items cards">
		{#each Object.keys(topItems) as site}
				{#each Object.keys(topItems[site]) as group}
					<div class="top-items-site card">
						<svg class="card-icon" style="fill: {colors[site]}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve">
							<use xlink:href="sprite.symbol.svg#{site.split('.').shift()}" />
						</svg>
						<h4 style="color: {colors[site]}">{site}</h4>
						<ListChart title={group} items={topItems[site][group]} />
					</div>
				{/each}
		{/each}
	</div>

{/if}

<style>
.cards {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
}
.cards {
	padding-top: 3rem;
}
.sites {
	display: flex;
  flex-direction: row-reverse;
  place-content:center;
	-webkit-mask-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0, rgb(0,0,0) 3%, rgb(0,0,0) 97%, rgba(0, 0, 0, 0) 100%);
	padding: 1rem 0;
	min-height: 12rem;
}
.sites :global(.site) {
	display: flex;
	transition: all .5s ease-out;
}

.sites :global(.site:not(:last-child)){
	margin-left: -14rem;
}
.sites :global(.site:hover),
.sites :global(.site:focus-within){
	transform: translate(0, 0) scale(1.1);
}

.sites :global(.site:hover ~ .site),
.sites :global(.site:focus-within ~ .site) {
	transform: translateX(-85%);
}

.card {
	position: relative;
	width: 32%;
	border-radius: 1rem;
	background: var(--background-lighter);
	margin-bottom: 3rem;
	padding: 2px 2px 1rem 2px;
}


.card-icon {
	position: absolute;
	left: 50%;
	width: 4.5rem;
	height: 4.5rem;
	transform: translate(-50%, -2rem);
	padding: .5rem;
	border-radius: .5rem;
	background: var(--background-lighter);
	fill: var(--highlight-2-1);
}


h4 {
  padding: 0;
  margin: 3rem 0 .5rem 0;
  font-size: 1.2rem;
	text-align: center;
  color: var(--highlight-2-1);
}

</style>
