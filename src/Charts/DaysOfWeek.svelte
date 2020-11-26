<script>
import math from '../libs/math.js';
export let data = [];
export let height = 6;
export let showAverage = true;

$: max = math.max(data);
$: avg = math.average(data);

const DAYSOFWEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const shiftSunday = (ar) => {
	let a = ar.slice(1);
	a.push(ar[0]);
	return a;
}


</script>


{#if data}
<div class="daysofweek_header">
	{#each shiftSunday(data) as v, index}
		<div>{(DAYSOFWEEK[index] || '').substr(0,2)}</div>
	{/each}
</div>
<div class="daysofweek" style="height: {height}rem;">
		{#each shiftSunday(data) as v}
			<div style="height: {Math.floor(100/max*v)}%"></div>
		{/each}
		{#if showAverage}
		<div class="average" style="top: {Math.floor(100/max*avg)}%"></div>
		{/if}
</div>
{/if}




<style>



.daysofweek_header,
.daysofweek {
	width: 100%;
	display: flex;
	margin: 0;
	padding: 0;
}
.daysofweek {
	position: relative;
	height: 6rem;
}
.daysofweek_header > div,
.daysofweek > div {
	background: var(--highlight-2-1);
	margin: 0;
	padding: 0;
	margin: 1px;
}
.daysofweek_header > div {
	color: var(--highlight-2-1);
	font-weight: bold;
	text-align: center;
	padding: .5rem;
	font-size: .8rem;
	background: var(--background-shade);
}

.daysofweek_header > div,
.daysofweek > div {
	width: 14.2857142857%;
}

.daysofweek div:nth-child(odd) {
	background: var(--highlight-1-1);
}
.daysofweek_header div:nth-child(6),
.daysofweek_header div:nth-child(7) {
	background: var(--tone-1);
}
.daysofweek .average {
	position: absolute;
	left: 0;
	right: 0;
	width: 100%;
	height: 1px;
	box-shadow: 0px 0px 3px var(--background-lighter);
	background-color: var(--tone-1) !important;
}
</style>
