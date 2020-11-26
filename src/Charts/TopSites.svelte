<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import TimeOfDay from './TimeOfDay.svelte';
import DaysOfWeek from './DaysOfWeek.svelte';
import Month from './Month.svelte';
import LineChart from './LineChart.svelte';

dayjs.extend(relativeTime);

export let data = [];
export let total = 0;

let active = null;
</script>

<table class="topsites">
  <tr>
    <th>Site</th>
    <th>Total traffic share</th>
    <th>Visits</th>
    <th>Last visit</th>
  </tr>
  {#each data as d}
    <tr on:click={() => { active = (active === d) ? null : d } } class="site-row">
      <td class="site">{d.domain}</td>

      <td class="share">
        <div class="share-site" style="width: {(100/total*d.count).toFixed(1)}%"></div>
        <div class="share-percent">{(100/total*d.count).toFixed(1)}%</div>
      </td>
      <td class="visits">{d.count}</td>
      <td class="last-visit">{dayjs().from(dayjs(d.to), true)}</td>
    </tr>
    {#if active === d}
      <tr>
        <td colspan="4" class="detail">
          <h4>History</h4>
          <LineChart data={d.frequencyByDay} />
          <h4>Active hours</h4>
          <TimeOfDay data={d.frequencyByHour} height="2" showAverage={false} />
          <div class="grid">
            <div class="grid-30">
              <h4>Active days of week</h4>
              <DaysOfWeek data={d.frequencyByWeekday} height="2" showAverage={false} />
            </div>
            <div class="grid-70">
              <h4>Active month</h4>
              <Month data={d.frequencyByMonth} height="2" showAverage={false} />
            </div>
          </div>
        </td>
      </tr>
    {/if}
  {/each}
</table>
<style>

h4 {
  padding: .5rem 0;
}
.topsites {
  width: 100%;
  border-spacing: 3px;
  color: var(--highlight-2-1);
}
.topsites th {
  padding: .5rem;
  font-size: .8rem;
  color: var(--highlight-2-2);
  background: var(--background-light);
}
.topsites td {
  font-size: .8rem;
  border-bottom: 1px solid var(--highlight-1-1);
  cursor: pointer;
}
td.site {
  font-size: 1rem;
  color: var(--highlight-2-2);
  font-weight: bold;
}
td.visits {
  text-align: right;
  padding-right: 1rem;
}
td.last-visit {
  text-align: center;
}
td.detail {
  padding: 1rem 0;
}
.share {
  position: relative;
  width: 25vw;
  height: 30px;
  background: var(--background-light);
}
.share-site {
  width: 0;
  height: 30px;
  background: var(--highlight-1-1);
}
.share-percent {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  color: var(--highlight-2-1);
  font-weight: bold;
}


.grid {
	position: relative;
	width: 100%;
	display: flex;
  margin: .5rem 0;
}
.grid .grid-30 {
	width: 35%;
}
.grid .grid-70 {
	width: 65%;
	padding-left: 2rem;
}
</style>
