<script>

import { trends } from './store.js';
import { average } from './libs/math.js';

import TimeOfDay from './Charts/TimeOfDay.svelte';
import DaysOfWeek from './Charts/DaysOfWeek.svelte';
import Month from './Charts/Month.svelte';
import TopSites from './Charts/TopSites.svelte';

let totals = null;
let topsites = null;

const TOPSITES_MAX = 20;

trends.subscribe(value => {
	value.then(res => {
		topsites = Object.entries(res.domains).map(e => e[1]).sort((a, b) => b.count - a.count).slice(0, TOPSITES_MAX);
		totals = res.totals;
	});
});



</script>

	{#if totals}
		<h3>Most active hours of day</h3>
		<p>This is your average activity for every hour of day. What is your peak browsing time?</p>
		<TimeOfDay data={totals.frequencyByHour} showFullHeader={true} />
	{/if}


<div class="grid">
	<section class="grid-30">
	<h3>Most active days of week</h3>
	<p>When are you active throughout the week? Do you browse more on weekdays or weekends?</p>
	{#if totals}
		<DaysOfWeek data={totals.frequencyByWeekday} />
	{/if}
	</section>
	<section class="grid-70">
	<h3>Most active month</h3>
	<p>How does seasons and holidays effect your browsing time? Do you have digital detox during vacations?</p>

	{#if totals}
		<Month data={totals.frequencyByMonth} />
	{/if}
	</section>
</div>
<h3>Top {TOPSITES_MAX} sites habits</h3>


<p>Frequency by hour of day for top {TOPSITES_MAX} sites. Click each site to find a detailed habit report.</p>

{#if topsites && totals}
	<TopSites data={topsites} total={totals.count} />
{/if}


<style>

.grid {
	position: relative;
	width: 100%;
	display: flex;
}
.grid .grid-30 {
	width: 35%;
}
.grid .grid-70 {
	width: 65%;
	padding-left: 2rem;
}
</style>
