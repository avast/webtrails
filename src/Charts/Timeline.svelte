<script>

import { afterUpdate, createEventDispatcher  } from 'svelte';

import milestones from "d3-milestones";

const dispatch = createEventDispatcher();

export let data = null;

let timelineDom;


afterUpdate(() => {
	let events = data.reduce((es, e) => {
		//console.log(e);
		return es.concat(e.leaks);
	}, [])
	.filter(e => e.protocol == 'http:');


	events.push({
		datetime : (new Date()).valueOf(),
		domain: ''
	});

	const vis = milestones(timelineDom)
	.mapping({
	  'timestamp': 'datetime',
	  'text': 'domain'
	})
	.optimize(true)
	.labelFormat('%Y %b %d')
	.aggregateBy('day')
	.onEventClick(d => {
		dispatch('filter', d.attributes);
	})
	.render(events);

});
</script>

<div bind:this={timelineDom} class="timelineChart"></div>

<style>
.timelineChart {
	width: 100%;
	height: 100%;
	color: var(--highlight-2-2);
}
/* SVG styling */
.timelineChart :global(svg) {
	width: 100%;
	height: 100%;
}

:global(.milestones__category_label) {
  display: inline-block;
  text-align: right;
  font-size: 14px;
  margin-top: -4px;
  float: left;
}
:global(.milestones__horizontal_line) {
  position: absolute;
  background-color: var(--highlight-2-2);
  height: 3px;
  margin-top: 4px;
  margin-left: 5.5px;
  border-radius: 1.5px;
}
:global(.milestones__group) {
  position: absolute;
  font-family: sans-serif;
  font-size: 10px;
}
:global(.milestones__group__bullet) {
  background-color: #fff;
  border: 3px solid var(--tone-2);
  border-radius: 50%;
  width: 0px;
  height: 0px;
  padding: 2.5px;
}
:global(.milestones__group__label) {
  position: absolute;
  border-left: 1px solid var(--tone-2);
  margin-left: 5px;
  padding: 0;
  color: inherit;
}
:global(.milestones__group__label div) {
  position: relative;
  margin-left: 3px;
}
:global(.milestones__group__label-above) {
  bottom: 100%;
}
:global(.milestones__group__label-last) {
  right: 100%;
  border-left: 0;
  border-right: 1px solid var(--tone-2);
  margin-left: 0;
  margin-right: -6px;
  text-align: right;
}
:global(.milestones__group__label-last div) {
  margin-left: 0px;
  margin-right: 3px;
}
:global(.milestones__group__label__text__title) {
  color: inherit;
  font-size: .7rem;
  white-space: nowrap;
}
:global(.milestones__group__label__text__event) {
  cursor: pointer;
	font-weight: bold;
	font-size: .9rem;
	display: block;
}
:global(.milestones__group__label__text__event:hover) {
  cursor: pointer;
	font-weight: bold;
	display: block;
	color: var(--tone-2);
}
:global(.milestones__group__label__text__event--hover) {
  color: var(--highlight-2-2);
}
</style>
