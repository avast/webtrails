<script>
import { scaleLinear, max } from 'd3';

export let title = null;
export let items = [];
export let maxItems = 10;
export let quant = 'size';
export let showHeader = true;

$: scale = scaleLinear()
  .domain([0, max(items, d => d[quant])])
  .range([0, 50]);


</script>

{#if title}<h5>{title}</h5>{/if}

{#if showHeader}
  <div class="item-header">
    <div class="text">
    {#if items && items[0].meta && items[0].meta[0]}
      {items[0].meta[0]}
    {:else}
      title
    {/if}
    </div>
    <div class="value">
    {#if items && items[0].meta && items[0].meta[1]}
      {items[0].meta[1]}
    {:else}
      size
    {/if}
    </div>
  </div>
{/if}
{#each items.slice(0,maxItems) as item}
  <div class="item">
    <div class="bar" style="width: {scale(item[quant])}%"></div>
    <div class="text">{item.title}</div>
    <div class="value">{item[quant]}</div>
  </div>
{/each}

<style>
.item-header,
.item {
  position: relative;
  margin: 1px 0;
  height: 2rem;
  border-bottom: 1px solid var(--highlight-1-1);
}
.item-header {
  border-bottom: none;
}
.bar {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--highlight-1-1);
  height: 100%;
  z-index: 0;
}
.text {
  position: absolute;
  top: 0;
  left: 0;
  padding: .5rem;
  z-index: 1;
  font-size: .8rem;
  width: 70%;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--highlight-2-2);
}
.value {
  position: absolute;
  top: 0;
  right: 0;
  padding: .5rem;
  z-index: 1;
  text-align: right;
  font-size: .8rem;
  width: 30%;
  color: var(--highlight-2-2);
}
h5 {
  padding: 0;
  margin: .5rem 0;
  font-size: 1.6rem;
  text-align: center;
  color: var(--highlight-2-2);
}
.item-header .text,
.item-header .value {
  background: var(--background-shade);
  text-align: center;
  color: var(--highlight-2-2);
}
.item-header .value {
  font-weight: bold;
  width: calc(30% - 1px);
}
</style>
