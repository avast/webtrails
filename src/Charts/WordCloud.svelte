<script>

import { afterUpdate, createEventDispatcher  } from 'svelte';

import * as d3 from 'd3';
import cloud from 'd3-cloud';

export let data = null;
let cloudDom;



afterUpdate(() => {
  cloudDom.innerHTML = '';

  if (data) {

    const fill = d3.scaleOrdinal(d3.schemeCategory10);

    const width = cloudDom.clientWidth;
    const height = cloudDom.clientHeight;

    const xScale = d3.scaleLinear()
       .domain([0, d3.max(data, function(d) {
          return d.value;
        })
       ])
       .range([5,60]);

    const layout = cloud()
        .size([width, height])
        .timeInterval(100)
        .words(data)
        //.padding(5)
        .fontSize(function(d) { return xScale(+d.value); })
        .text(function(d) { return d.text; })
        .rotate(function() { return (~~(Math.random() * 2)) ? 45 : -45; })
        .font("Impact")
        .on("end", draw)

    layout.start();

    function draw(words) {
      d3.select(cloudDom)
          .attr("viewbox", `0 0 ${width} ${height}`)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return xScale(d.value) + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
          .text(function(d) { return d.text; });
    }

  }
});
</script>

<svg bind:this={cloudDom} class="cloudDom"></svg>

<style>

svg {
  width: 100%;
  height: 100%;
  min-height: 400px;
}

</style>
