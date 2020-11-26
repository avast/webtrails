<script>
import math from '../libs/math.js';
export let data = [];
export let height = 6;
export let showAverage = true;

$: max = math.max(data);
$: avg = math.average(data);

const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


</script>


{#if data}
<div class="month_header">
	{#each data as v, index}
		<div>{(MONTH[index]  || '').substr(0,3)}</div>
	{/each}
</div>
<div class="month" style="height: {height}rem;">
		{#each data as v}
			<div style="height: {Math.floor(100/max*v)}%"></div>
		{/each}
		{#if showAverage}
		<div class="average" style="top: {Math.floor(100/max*avg)}%"></div>
		{/if}
</div>
{/if}




<style>



.month_header,
.month {
	width: 100%;
	display: flex;
	margin: 0;
	padding: 0;
}
.month {
	position: relative;
	height: 6rem;
}
.month_header > div,
.month > div {
	background: var(--highlight-2-1);
	margin: 0;
	padding: 0;
	margin: 1px;
}
.month_header > div {
	color: var(--highlight-2-1);
	font-weight: bold;
	text-align: center;
	padding: .5rem;
	font-size: .8rem;
	background: var(--background-shade);
}

.month_header > div,
.month > div {
	width: 14.2857142857%;
}

.month div:nth-child(odd) {
	background: var(--highlight-1-1);
}

.month .average {
	position: absolute;
	left: 0;
	right: 0;
	width: 100%;
	height: 1px;
	box-shadow: 0px 0px 3px var(--background-lighter);
	background-color: var(--tone-1) !important;
}
</style>
