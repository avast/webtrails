<script>
import { scaleLinear } from 'd3';
import { trends } from './store.js';

import colors from './config/colors.json';
import Heatmap from './Charts/Heatmap.svelte';
import RadialBarChart from './Charts/RadialBarChart.svelte';
import Nodata from './components/Nodata.svelte';

import { reverse } from './libs/opencage.js';

const TOFIXED = 2;

let locations = [];
let coords = null;
let topSites = [];
let itemsTotal = 0;
let topSitesChart = [];
let topLocations = [];
let topLocationsScale = null;
trends.subscribe(value => {
	let topUniquePlaces = {};

	value.then(res => {
		locations = res.locations;
		itemsTotal = locations.length;

		setMapData();

		topSites = locations.reduce((t, l) => {
			let roundId = l.location.lon.toFixed(TOFIXED)+','+ l.location.lat.toFixed(TOFIXED);
			if (!topUniquePlaces[roundId]) topUniquePlaces[roundId] = 0;
			topUniquePlaces[roundId]++;

			if (! t[l.location.service]) t[l.location.service] = [];
			t[l.location.service].push(l);
			return t;
		}, {});

		topSitesChart = Object.entries(topSites).map(entry => {
			return {
				id: entry[0],
				value: entry[1].length,
				color : colors[entry[0]] || '#CCC'
			};
		});



		let topLocationsDomain = Object.entries(topUniquePlaces).map(entry => {
			let pos = entry[0].split(',')
			return {
				lon: pos[0],
				lat: pos[1],
				value: entry[1]
			}
		})
		.sort((a, b) => b.value - a.value)
		.slice(0,5)
		.map((pos, index) => {
			setTimeout(()=> {
				reverse(pos.lat, pos.lon)
					.then(result => {
						 topLocations = [...topLocations, Object.assign(pos, { result : result.results[0] })];
					})
			}, 1200*index);
			return pos.value
		});

		topLocationsScale = scaleLinear()
			.domain([0, Math.max(...topLocationsDomain)])
			.range([0, 40]);

  });
});

function setMapData(filter) {
	const locs = (!filter) ? locations : locations.filter(i => i.domain == filter);
	coords = locs.map(l => [l.location.lon, l.location.lat, 1]);

}


function filter(event) {
	setMapData(event.detail);
}
</script>



{#if locations.length == 0}
	<Nodata />
{:else}


	<div class="panel-overview">
		<div class="panel-highlights">
			<h3>Top locations</h3>
			<p>Here are the most frequented areas that are leaking through you browser history.</p>
			{#each topLocations as {result, value}}
			<div class="top-location">
				<div class="flag" style="background-image: url(flags/{result.components.country_code}.svg)"></div>
				<div class="country">{result.components.country} -  {result.components.town || result.components.state}</div>
				<div class="ratio" style="width: {topLocationsScale(value)}%;"></div>
				<div class="address">around: {result.formatted}</div>
			</div>
			{/each}
		</div>
		<div class="panel-topratios">
			<h3>Map site usage</h3>
			<p>What popular map sites are you using?</p>
			<RadialBarChart data={topSitesChart.slice(0,5)} on:filter={filter} />
		</div>
	</div>


	<h3>Locations</h3>

	<p>The hottest locations you have explored throughout your history.</p>
	<Heatmap data={coords} />

{/if}
<style>
.flag {
	width: 2rem;
	height: 2rem;
	float: left;
	margin: .5rem;
	border-radius: 100%;
	background-size: cover;
	background-position: center;
}
.ratio {
	background: var(--highlight-2-2);
	border-radius: 5px;
	height: .5rem;
	margin: .1rem 0;
	margin-left: 3rem;
}
.top-location {
	padding: .5rem;
}
.top-location .country {
	font-size: .9rem;
	padding: .2rem;
}
.top-location .address {
	font-size: .8rem;
}
</style>
