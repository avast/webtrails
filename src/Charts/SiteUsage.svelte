<script>
import { afterUpdate } from 'svelte';

import * as d3 from 'd3';

let svgDom

export let data=[];


afterUpdate(() => {

  if(data){
    // set the dimensions and margins of the graph
    // append the svg object to the body of the page
    var svg = d3.select(svgDom);

    console.log(data);

      // List of groups = header of the csv files
      var keys = Object.keys(data[0]);

      // Add X axis
      var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.year; }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 200000])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // color palette
      var color = d3.scaleOrdinal()
        .domain(keys)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'])

      //stack the data?
      var stackedData = d3.stack()
        .keys(keys)
        (data)
        //console.log("This is the stack result: ", stackedData)

      // Show the areas
      svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
          .style("fill", function(d) { console.log(d.key) ; return color(d.key); })
          .attr("d", d3.area()
            .x(function(d, i) { return x(d.data.year); })
            .y0(function(d) { return y(d[0]); })
            .y1(function(d) { return y(d[1]); })
        )
  }
})

</script>

<svg bind:this={svgDom}></svg>

<style>

svg {
  min-height: 200px;
  width: 100%;
}

</style>
