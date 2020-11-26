<script>

import { afterUpdate } from 'svelte';

import * as d3 from 'd3';
import simpleheat from 'simpleheat';
import world from '../data/world-50m.json';
import * as topojson from 'topojson-client';


export let data = null;
let mapDom;

afterUpdate(() => {
if (data) {
  const width = mapDom.clientWidth;
  const height = width/1.8;

  mapDom.innerHTML = '';
  const div = d3.select(mapDom).style('height', height+'px');


  const mapLayer = div.append('svg').attr('id', 'map').attr('width', width).attr('height', height);
  const canvasLayer = div.append('canvas').attr('id', 'heatmap').attr('width', width).attr('height', height);

  const canvas = canvasLayer.node();
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 0.5;

  const projection = d3.geoEquirectangular().translate([width/2, height/2]);
  const path = d3.geoPath(projection);


  const countries = topojson.feature(world, world.objects.countries).features;

  mapLayer
      .append('g')
      .classed('countries', true)
      .selectAll(".country")
        .data(countries)
      .enter()
        .append("path")
        .attr("class", "country")
        .attr("d", path);


    const heat = simpleheat(canvas);
    heat.data(data.map(item => [ ...projection([item[0], item[1]]), item[2] ] ));

    // set point radius and blur radius (25 and 15 by default)
    heat.radius(2, 2);

    // optionally customize gradient colors, e.g. below
    // (would be nicer if d3 color scale worked here)
    //heat.gradient({0: '#0000ff', 0.5: '#00ff00', 1: '#ff0000'});

    // set maximum for domain
    heat.max(3)
    //heat.max(d3.max(dests, d => +d.watches));

    // draw into canvas, with minimum opacity threshold
    heat.draw(0.005);
}
});
</script>

<div class="container" bind:this={mapDom}></div>

<style>
.container {
  position: relative;
}
.container :global(svg),
.container :global(canvas) {
  position: absolute;
  top: 0;
}
:global(svg) {
}
:global(.countries) {
  opacity: .1;
  fill: var(--highlight-2-2);
}
</style>
