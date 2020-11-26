<script>
import { afterUpdate, createEventDispatcher  } from 'svelte';
import * as d3 from 'd3';

const dispatch = createEventDispatcher();

let svgDom;

export let data = null;
export let delay = 300;

const tau = 2 * Math.PI; // http://tauday.com/tau-manifesto
const width = 300;
const height = width;
const itemWidth = 10;
const itemSpace = itemWidth;


function getInnerRadius(index) {
  const offset = (index * (itemWidth+itemSpace));
  return width/2 - itemWidth - offset;
}

function getOuterRadius(index) {
  return getInnerRadius(index) + itemWidth;
}

afterUpdate(() => {

  if (data) {
    let svg = d3.select(svgDom)
      .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    data = data.sort((a, b) => b.value - a.value);

    let scale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.value)])
        .range([0, tau * 0.75]);


    const arc = d3.arc()
      .innerRadius((d, i) => getInnerRadius(i))
      .outerRadius((d, i) => getOuterRadius(i))
      .cornerRadius(5)
      .startAngle(0)
      .endAngle((d, i) => scale(d));


    //data arcs
    let arcs = svg.append('g')
      .attr('class', 'data')
      .selectAll('path')
        .data(data)
        .enter().append('path')
        .attr('class', 'arc')
        .style('fill', (d, i) => d.color);

    let labels = svg.append('g')
      .attr('class', 'label')
      .selectAll('text')
        .data(data)
        .enter().append('text')
        .attr('class', 'label');

    labels
      .text(d => d.id)
      .attr('text-anchor', 'end')
      .attr('y', (d, i) => 0 - getInnerRadius(i))
      .attr('x', 0 - itemSpace)
      .style('fill', (d, i) => d.color)
      .on('click', (d, i) => {
        dispatch('filter', d.id);
      });


      arcs.transition()
        .delay((d, i) => i * 200 + delay)
        .duration(1000)
        .attrTween('d', arcTween);



    function arcTween(d, i) {
      let interpolate = d3.interpolate(0, d.value);
      return t => arc(interpolate(t), i);
    }

    }
  });
</script>

<svg width="100%" viewBox="0 0 {width} {height}" bind:this={svgDom}></svg>

<style>
svg {
  height: calc(100% - 4rem);
}
svg :global(text) {
  cursor: pointer;
}
</style>
