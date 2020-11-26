<script>

import { trends } from './store.js';
import colors from './config/colors.json';
import RadialBarChart from './Charts/RadialBarChart.svelte';
import TimeOfDay from './Charts/TimeOfDay.svelte';
import DaysOfWeek from './Charts/DaysOfWeek.svelte';
import LineChart from './Charts/LineChart.svelte';
import Nodata from './components/Nodata.svelte';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { trendCounter } from './libs/trend.counter.js';

dayjs.extend(relativeTime);

let videos = [];
let topvideos = [];
let topsites = {};
let topsitesChart = [];
let topsitesTotal = 0;
let timeTrends = null;
let timeTrendsCache = {};

trends.subscribe(value => {
	value.then(res => {
    videos = res.videos;
		topsitesTotal = videos.length;
		topvideos = Object.entries(res.videos.reduce((r, v) => {
      // count totals for site
      if (!topsites[v.video.service]) topsites[v.video.service] = [];
      topsites[v.video.service].push(v);

			trendCounter(timeTrendsCache, v, {
				timestamp : 'time',
				date: 'datetime'
			});


      // map by unique videos
      if (!r[v.video.service+'/'+v.video.id]) r[v.video.service+'/'+v.video.id] = {
					title: v.title,
					url : v.url,
          id: v.video.id,
          service : v.video.service,
          count : 0,
          plays : []
      }
			if(r[v.video.service+'/'+v.video.id].title == '') r[v.video.service+'/'+v.video.id].title = v.title;
      r[v.video.service+'/'+v.video.id].plays.push(v);
      r[v.video.service+'/'+v.video.id].count++;
      return r;
    }, {}))
    .map(entry => entry[1])
    .sort((a, b) => b.count - a.count);

		timeTrends = timeTrendsCache;

		topsitesChart = Object.entries(topsites).map(entry => {
			return {
				id: entry[0],
				value: entry[1].length,
				color : colors[entry[0]] || '#999'
			};
		});
  });
});

</script>



{#if videos.length == 0}
	<Nodata />
{:else}

	<div class="panel-overview">
		<div class="panel-highlights">
			<h3>Trend</h3>
			<p>How much time do you spend watching videos?</p>
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
			<h3>Video site usage</h3>
			<p>What streaming sites are your most frequented?</p>
			<RadialBarChart data={topsitesChart.slice(0,5)} />
		</div>
	</div>

	<h3>Frequented videos</h3>
	<p>The most frequented videos in your history.</p>
	<div class="topvideos">
	{#each topvideos.slice(0,10) as { service, id, count, plays, title, url } }
		<div class="video">
			<a href="{url}" target="_blank">
			{#if service == 'youtube.com'}
				<div class="video-preview" data-videoId="{id}">
					<img class="video-preview" src="https://img.youtube.com/vi/{id}/hqdefault.jpg" alt="" />
				</div>
			{:else}
				<div class="video-preview" data-videoId="{id}"></div>
			{/if}
			</a>
			<h4><a href="{url}" target="_blank">
			<svg class="service {service}">
				 <use xlink:href="sprite.symbol.svg#{service.split('.').shift()}"></use>
			</svg>
			{title}</a></h4>
			<p>{service}</p>
			<p>Views: {count}</p>
		</div>
	{/each}
	</div>



	<h3>Video history</h3>

	<table class="table">
	{#each videos as { url, video, datetime, title } }
	  <tr>
	  	<td>
				<svg class="service {video.service}">
					 <use xlink:href="sprite.symbol.svg#{video.service.split('.').shift()}"></use>
				</svg>
			</td>
			<td><a href="{url}" target="_blank">{title}</a></td>
			<td>{dayjs().from(dayjs(datetime), true)}</td>
	  </tr>
	{/each}
	</table>

{/if}
<style>

.topvideos {
	display: flex;
	flex-wrap: wrap;
}
.video {
	font-size: .8rem;
	width: 24%;
	margin: 2% 1% 0 0;
}

.video-preview {
	width: 100%;
	min-height: 10rem;
	background: var(--background-shade);
}
.video-preview img {
	width: 100%;
	vertical-align: middle;
}
.video h4 {
	color: var(--highlight-2-2);
}
td svg.service,
.video h4 svg {
	width: 1rem;
	height: 1rem;
	vertical-align: middle;
	background: transparent;
}

.youtube {
	fill: #FB0005;
	background-color: #FB0005;
}
.vimeo {
	fill: #119CEA;
	background-color: #119CEA;
}
.vine {
	fill: #15A875;
	background-color: #15A875;
}
.videopress {
	fill: #27858E;
	background-color: #27858E;
}
.ratio {
	display: flex;
	width: 100%;
	position: relative;
	height: 1rem;
}
.ratio > div {
	height: 100%;
}
.ratio-legend {
	text-transform: capitalize;
}
.ratio-legend svg{
	width: 1.5rem;
	height: 1.5rem;
	background: transparent;
	vertical-align: middle;
}
</style>
