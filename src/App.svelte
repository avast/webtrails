
<script>
import colors from './libs/colors.js';
import dayjs from 'dayjs';

import { onMount } from 'svelte';

import { trends, trendsProgress } from './store.js';

import Loader from './components/Loader.svelte';

import Security from './Security.svelte';
import Habits from './Habits.svelte';
import History from './History.svelte';
import Search from './Search.svelte';
import Videos from './Videos.svelte';
import Locations from './Locations.svelte';
import Social from './Social.svelte';


const tabs = {

	Habits : {
		name: 'Habits',
		component: Habits
	},
	/*Trends : {
		name: 'Trends',
		component: Trends
	},*/
	Socials : {
		name : 'Social',
		component : Social
	},
	Search : {
		name: 'Search',
		component: Search
	},
	Videos : {
		name: 'Videos',
		component: Videos
	},
	Locations : {
		name: 'Locations',
		component: Locations
	},
	Security : {
		name: 'Security',
		component: Security
	},
	History : {
		name: 'History',
		component: History
	}

};

let selectedTab = tabs.Habits;
let promised = null;
let totals = null;
let progress = 0;

trendsProgress.subscribe(value => {
	progress = value;
});
trends.subscribe(value => {

	promised = value;
	promised.then(res => {
		totals = res.totals;
	})
});


function reload (){
	location.reload();
}


</script>



<div class="header">
	<h1 on:click={reload}>WebTrails </h1>
	<h3 class="subtitle">by Avast Labs - Browser History Viewer</h3>
	{#if totals}
		<h3>{dayjs(totals.from).format('MMM DD, YYYY')} - {dayjs(totals.to).format('MMM DD, YYYY')}</h3>
	{/if}

	<nav class="tabs">
		{#each Object.keys(tabs) as id}
		<button on:click={() => selectedTab = tabs[id] } class:active={selectedTab == tabs[id]} >{tabs[id].name}</button>
		{/each}
	</nav>
</div>
<div class="report">

	{#await promised}
		<Loader progress={progress} />
	{:then result}
		<svelte:component this={selectedTab.component}/>
	{:catch e}
	---{e}---
	{/await}




</div>
<div class="footer">
	Avast Labs experiment.
</div>


<style>

.header {
	position: sticky;
	height: 18vh;
	background: var(--background-shade);
	background: url('theme.png') no-repeat;
	background-size: cover;
	color: var(--tone-1);
	overflow: hidden;
	top: 0;
	z-index: 100;
	box-shadow: 0 30px 20px 0 var(--background);
}
.header h1 {
	text-align: center;
	padding: 1rem 0 0;
	font-size: 2rem;
	color: var(--tone-3);
}
.header h3.subtitle {
	font-size: 1rem;
	text-align: center;
	color: var(--tone-3);
}
.header h3 {
	font-size: 1rem;
	text-align: center;
	color: var(--tone-3);
}

.tabs {
	position: absolute;
	left: 0;
	bottom: 0;
	height: 2.5rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: baseline;
	border-bottom: 1px solid var(--tone-1);
}
.tabs button {
	padding: .5rem 1rem;
	font-size: 1rem;
	border-color: inherit;
	border-style: solid;
	border-top-width: 1px;
	border-left-width: 1px;
	color: inherit;
	font-weight: bold;
	background: rgba(255,255,255,.5);
	backdrop-filter: blur(5px);
	transform: translateY(-5px);
}
.tabs button:last-child {
	border-right-width: 1px;
}
.tabs button.active + button {
	border-left-width: 0;
}
.tabs button.active {
	background: var(--background);
	border-color: var(--tone-1);
	color: var(--tone-1);
	border-top-width: 5px;
	border-right-width: 1px;
	font-size: 1.3rem;
	transform: translateY(0px);
}


.report {
	position: relative;
	padding: 0 2rem;
	min-height: 65vh;
}

.report :global(h3) {
	padding: 2rem 0 1rem;
}
.report :global(p) {
	padding: .5rem 0;
}
.footer {
	text-align: center;
	padding: 4rem;
}

</style>
