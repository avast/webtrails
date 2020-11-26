<script>

import { onMount, onDestroy, afterUpdate, beforeUpdate } from 'svelte';
import { deleteAll } from './chrome/history.js';

import { sources } from './store.js';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

let top = document.body.scrollTop;
let table;
let marginTop = 0;
let visits = [];
let page = 0;
let size = 50;
let rowHeight = 30;
let ticking = false;
let updating = false;

sources.subscribe(value => {
  visits = value.d;
});


$: paging = paged ( visits, page, size, rowHeight );

function paged( visits, page, size, rowHeight ) {

  let length = visits.length;

  // start of visible data
  let start = page*size;
  // end of visble data
  let end = page*size + size*2;
  // visible data
  let data = visits.slice(start, end);


  return {
    preSize : page * size * rowHeight,
    postSize : (length - (page*size) - data.length) * rowHeight,
    data,
    length,
    start,
    total : parseInt(length / size)
  }
}


function confirmDelete(){
  if (confirm('Are you sure you want to clear your Browsing history?')) deleteAll();
}



function scroller () {

  if (!ticking || !updating) {
    window.requestAnimationFrame(() => {
      top = document.body.scrollTop;
      let newPage = parseInt(document.body.scrollTop/(rowHeight*size));
      if (newPage != page) {

        updating = true;
        page = newPage;

      }
      ticking = false;
    });
  }
  ticking = true;
}

onMount(() => {
  scroller();
  document.body.addEventListener('scroll', scroller);
});

afterUpdate(() => {
  document.body.scrollTop = top;
  updating = false;
});


onDestroy(() => {
  document.body.removeEventListener('scroll', scroller);
});
</script>


<h3>Full history</h3>

<div class="actions">
  <button class="button" on:click={() => confirmDelete()}>Clear History</button>
</div>

{#if paging.data}
<table class="table" bind:this={table}>
  <tr>
    <th>Date</th>
    <th>Title</th>
    <th>URL</th>
  </tr>

  <tr><td class="table-spacer" style="height: {paging.preSize}px"></td></tr>
  {#each paging.data as { url, title, time}, index}
  <tr>
    <td>{paging.start+ index}. {dayjs().from(dayjs(time), true)}</td>
    <td><div class="wrap">{title}</div></td>
    <td><a href="{url}" target="_blank" class="wrap">{url}</a></td>
  </tr>
  {/each}

  <tr><td class="table-spacer" style="height: {paging.postSize}px"></td></tr>
</table>
{/if}


<style>

tr td {
  height: 30px;
}
td { max-width:30vw; }

td > .wrap{
  display: block;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
}
.table-spacer {
  border-bottom: none;
}

.actions {
  text-align: right;
}
</style>
