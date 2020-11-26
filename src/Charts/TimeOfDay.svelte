<script>
import math from '../libs/math.js';
export let data = [];
export let height = 6;
export let showAverage = true;
export let showFullHeader = false;

$: max = math.max(data);
$: avg = math.average(data);

</script>
{#if showFullHeader}
<svg version="1.1" width="100%" style="vertical-align: top;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
   viewBox="0 0 500 94" xml:space="preserve">
<style type="text/css">
  .st0{fill:#FCC611;}
  .st1{fill:none;stroke:#2861D5;stroke-width:1;stroke-miterlimit:10;}
  .st2{fill:none;stroke:#3177E6;stroke-width:1;stroke-linecap:round;stroke-miterlimit:10;}
  .st3{fill:none;stroke:#3177E6;stroke-width:1;stroke-miterlimit:10;}
  .st4{fill:#2861D5;}
  .st5{font-family:inherit; text-anchor:  middle; fill: var(--color);}
  .st6{font-size:8px; }
  .st7{fill:none;stroke:var(--color); stroke-width:1; stroke-miterlimit:10;}
  .st8{display:none;fill:none;stroke:var(--color);stroke-miterlimit:10;}
</style>
<g id="Layer_2">
  <path class="st0" d="M408,93.41C359.61,86.71,306.39,83,250.5,83S141.39,86.71,93,93.41H408z"/>
</g>
<g id="Layer_1">
  <path class="st1" d="M453.97,50.44c-0.11-0.53-0.51-0.95-1.03-1.08c-3.36-0.83-5.71-3.82-5.71-7.29c0-2.4,1.11-4.6,3.05-6.04
    c0.93-0.69,0.62-2.19-0.5-2.47c-0.81-0.2-1.63-0.3-2.46-0.3c-5.67,0-10.28,4.61-10.28,10.28s4.61,10.28,10.28,10.28
    c2.22,0,4.33-0.7,6.11-2.01C453.87,51.51,454.08,50.96,453.97,50.44z"/>
  <g id="Layer_4">
    <line class="st2" x1="250" y1="47" x2="250" y2="40.64"/>
    <line class="st2" x1="236.36" y1="27" x2="230" y2="27"/>
    <line class="st2" x1="270" y1="27" x2="263.64" y2="27"/>
    <line class="st2" x1="250" y1="13.36" x2="250" y2="7"/>
    <line class="st2" x1="260" y1="44.32" x2="256.82" y2="38.81"/>
    <line class="st2" x1="238.19" y1="33.82" x2="232.68" y2="37"/>
    <line class="st2" x1="267.32" y1="17" x2="261.81" y2="20.18"/>
    <line class="st2" x1="243.18" y1="15.19" x2="240" y2="9.68"/>
    <line class="st2" x1="267.32" y1="37" x2="261.81" y2="33.82"/>
    <line class="st2" x1="243.18" y1="38.81" x2="240" y2="44.32"/>
    <line class="st2" x1="260" y1="9.68" x2="256.82" y2="15.19"/>
    <line class="st2" x1="238.19" y1="20.18" x2="232.68" y2="17"/>
    <path class="st3" d="M260,26.98c0-5.58-4.54-10.12-10.12-10.12c-5.58,0-10.12,4.54-10.12,10.12s4.54,10.12,10.12,10.12
      S260,32.56,260,26.98z"/>
  </g>
  <path class="st3" d="M300.49,56h25.96c0.96,0,1.74-0.78,1.74-1.74c0-4.03-3.28-7.3-7.3-7.3c-0.11,0-0.22,0-0.32,0.01
    c-0.78-3.19-3.66-5.57-7.09-5.57c-3.43,0-6.31,2.38-7.09,5.57c-0.11,0-0.22-0.01-0.32-0.01c-4.03,0-7.3,3.28-7.3,7.3
    C298.75,55.22,299.53,56,300.49,56z"/>
  <path class="st3" d="M175.49,48h25.96c0.96,0,1.74-0.78,1.74-1.74c0-4.03-3.28-7.3-7.3-7.3c-0.11,0-0.22,0-0.32,0.01
    c-0.78-3.19-3.66-5.57-7.09-5.57s-6.31,2.38-7.09,5.57c-0.11,0-0.22-0.01-0.32-0.01c-4.03,0-7.3,3.28-7.3,7.3
    C173.75,47.22,174.53,48,175.49,48z"/>
  <path class="st4" d="M424.7,60.28h25.96c0.96,0,1.74-0.78,1.74-1.74c0-4.03-3.28-7.3-7.3-7.3c-0.11,0-0.22,0-0.32,0.01
    c-0.78-3.19-3.66-5.57-7.09-5.57s-6.31,2.38-7.09,5.57c-0.11,0-0.22-0.01-0.32-0.01c-4.03,0-7.3,3.28-7.3,7.3
    C422.96,59.51,423.74,60.28,424.7,60.28z"/>
  <path class="st4" d="M49.86,60h25.96c0.96,0,1.74-0.78,1.74-1.74c0-4.03-3.28-7.3-7.3-7.3c-0.11,0-0.22,0-0.32,0.01
    c-0.78-3.19-3.66-5.57-7.09-5.57c-3.43,0-6.31,2.38-7.09,5.57c-0.11,0-0.22-0.01-0.32-0.01c-4.03,0-7.3,3.28-7.3,7.3
    C48.13,59.22,48.9,60,49.86,60z"/>
</g>
<g id="Layer_3">
  <text transform="matrix(1 0 0 1 62.6445 78.937)" class="st5 st6">03:00</text>
  <text transform="matrix(1 0 0 1 123.6445 78.937)" class="st5 st6">06:00</text>
  <text transform="matrix(1 0 0 1 186.6445 78.937)" class="st5 st6">09:00</text>
  <text transform="matrix(1 0 0 1 249.6445 78.937)" class="st5 st6">12:00</text>
  <text transform="matrix(1 0 0 1 312.6445 78.937)" class="st5 st6">15:00</text>
  <text transform="matrix(1 0 0 1 375.6445 78.937)" class="st5 st6">18:00</text>
  <text transform="matrix(1 0 0 1 437.6445 78.937)" class="st5 st6">21:00</text>

</g>
<g id="Layer_5">
  <g>
    <line class="st7" x1="0" y1="87.99" x2="0" y2="94"/>
    <line class="st7" x1="20.83" y1="87.99" x2="20.83" y2="94"/>
    <line class="st7" x1="41.67" y1="87.99" x2="41.67" y2="94"/>
    <line class="st7" x1="62.5" y1="87.99" x2="62.5" y2="94"/>
    <line class="st7" x1="83.33" y1="87.99" x2="83.33" y2="94"/>
    <line class="st7" x1="104.17" y1="87.99" x2="104.17" y2="94"/>
    <line class="st7" x1="125" y1="81" x2="125" y2="94"/>
    <line class="st7" x1="145.83" y1="87.99" x2="145.83" y2="94"/>
    <line class="st7" x1="166.67" y1="87.99" x2="166.67" y2="94"/>
    <line class="st7" x1="187.5" y1="87.99" x2="187.5" y2="94"/>
    <line class="st7" x1="208.33" y1="87.99" x2="208.33" y2="94"/>
    <line class="st7" x1="229.17" y1="87.99" x2="229.17" y2="94"/>
    <line class="st7" x1="250" y1="81" x2="250" y2="94"/>
    <line class="st7" x1="270.83" y1="87.99" x2="270.83" y2="94"/>
    <line class="st7" x1="291.67" y1="87.99" x2="291.67" y2="94"/>
    <line class="st7" x1="312.5" y1="87.99" x2="312.5" y2="94"/>
    <line class="st7" x1="333.33" y1="87.99" x2="333.33" y2="94"/>
    <line class="st7" x1="354.17" y1="87.99" x2="354.17" y2="94"/>
    <line class="st7" x1="375" y1="81" x2="375" y2="94"/>
    <line class="st7" x1="395.83" y1="87.99" x2="395.83" y2="94"/>
    <line class="st7" x1="416.67" y1="87.99" x2="416.67" y2="94"/>
    <line class="st7" x1="437.5" y1="87.99" x2="437.5" y2="94"/>
    <line class="st7" x1="458.33" y1="87.99" x2="458.33" y2="94"/>
    <line class="st7" x1="479.17" y1="87.99" x2="479.17" y2="94"/>
    <line class="st7" x1="500" y1="87.99" x2="500" y2="94"/>
    <path class="st8" d="M500,94"/>
  </g>
  <line class="st7" x1="0" y1="94" x2="500" y2="94"/>
</g>
</svg>
{:else}
<div class="timeofday_header">
	{#each data as v, index}
		<div>{index}</div>
	{/each}
</div>
{/if}
<div class="timeofday" style="height: {height}rem;">
  {#if data}
    {#each data as v}
      <div style="height: {Math.floor(100/max*v)}%"></div>
    {/each}
    {#if showAverage}
    <div class="average" style="top: {Math.floor(100/max*avg)}%"></div>
    {/if}
  {/if}
</div>




<style>
.timeofday_header,
.timeofday {
	width: 100%;
	display: flex;
	margin: 0;
	padding: 0;
}
.timeofday {
	position: relative;
	height: 6rem;
}
.timeofday_header > div,
.timeofday > div {
	background: var(--highlight-2-1);
	margin: 0;
	padding: 0;
	margin: 1px;
}
.timeofday_header > div {
	color: var(--highlight-2-1);
	font-weight: bold;
	text-align: center;
	padding: .5rem .2rem;
	font-size: .8rem;
	background: var(--background-shade);
}

.timeofday_header > div,
.timeofday > div {
	width: 4.1666666666666666667%;
}

.timeofday div:nth-child(odd) {
	background: var(--highlight-1-1);
}
.timeofday .average {
	position: absolute;
	left: 0;
	right: 0;
	width: 100%;
	height: 1px;
	box-shadow: 0px 0px 3px var(--background-lighter);
	background-color: var(--tone-1) !important;
}
</style>
