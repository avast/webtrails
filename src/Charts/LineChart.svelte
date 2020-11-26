<script>


import { afterUpdate } from 'svelte';
import * as d3 from "d3";

export let data = null;

export let height = 5;

let svgNode;

export let sort = function(a,b){
  return new Date(b.date) - new Date(a.date);
}

afterUpdate(() => {

  if (data) {
    let lineData = Object.entries(data).map(entry => {
      return {
        date : new Date(parseInt(entry[0])),
        value: entry[1]
      }
    });
    lineData.sort(sort);

    svgNode.style.height = height +'rem';

    let sheight  = svgNode.clientHeight - 25;
    let swidth   = svgNode.clientWidth;
    let hEach   = 40;

    let svg = d3.select(svgNode);

    // set the ranges
    let x = d3.scaleTime().range([0, swidth]);

    x.domain(d3.extent(lineData, function(d) { return d.date; }));

    let y = d3.scaleLinear().range([sheight, 0]);


    y.domain([0, d3.max(lineData, function(d) { return d.value; })]);


    let valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value);  })
            .curve(d3.curveMonotoneX);


    svg.append("path")
        .data([lineData])
        .attr("class", "line")
        .attr("d", valueline);


    var xAxis_woy = d3
      .axisBottom(x)
      .ticks(10)
      .tickFormat(d3.timeFormat("%Y %b"));

    function adjustTextLabels(selection) {
        selection.selectAll('text')
            .attr('transform', 'translate(30,0)');
    }

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + sheight + ")")
            .call(xAxis_woy)
            .call(adjustTextLabels);

    //  Add the Y Axis
    //  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
    //  svg.append("g").call(d3.axisLeft(y));

  }
});

</script>

<svg bind:this={svgNode} class="linechart"></svg>

<style>

svg {
  width: 100%;
  height: 5rem;
}

.linechart :global(.line) {
    fill: none;
    stroke: var(--tone-1);
    stroke-width: 3;
}

.linechart :global(.axis path),
.linechart :global(.axis line) {
  fill: none;
  stroke: var(--highlight-2-1);
  shape-rendering: crispEdges;
}
.linechart :global(.axis text) {
  font-size: .7rem;
}

</style>
