<script>
import { slide } from 'svelte/transition';
import { quintOut } from 'svelte/easing';

import colors from '../config/colors.json';

export let site = null;

</script>

{#if site}
<div class="site" style="background: {colors[site.id]}"
  transition:slide="{{delay: 250, duration: 300, easing: quintOut }}">
  <svg class="site-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve">
    <use xlink:href="sprite.symbol.svg#{site.id.split('.').shift()}" />
  </svg>
  <div class="site-name">{site.id}</div>
  <div class="site-info">
    {#if site.accounts.length == 0}
      No account detected
    {:else if site.accounts[0] === true}
      Using account:<br/>
      <strong>?</strong>
    {:else if site.accounts.length == 1}
      Using account:<br/>
      <strong>{site.accounts[0]}</strong>
    {:else}
      Using accounts: <br/>
      {#each site.accounts as account}
        <strong>{account}</strong><br/>
      {/each}
    {/if}

    <br/>
    Visits: {site.urls.length}
  </div>

    {#if site.accounts.length == 1}
      <svg class="site-account" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve">
        <use xlink:href="icons.svg#ACCOUNT" />
      </svg>
    {:else if  site.accounts.length > 1}
      <svg class="site-account" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve">
        <use xlink:href="icons.svg#ACCOUNTS" />
      </svg>
    {/if}


</div>
{/if}

<style>
.site {
	position: relative;
	border-radius: .5rem;
  min-width: 10rem;
	width: calc(33.3% - .2rem);
  max-width: 17rem;
  min-height: 9rem;
	margin: .1rem;
	background: #999;
	color: #FFF;
}
/*
.site:after {
  position: absolute;
  content: '';
  right: 0;
  top: 0;
  bottom: 0;
  width: 7px;
  background: inherit;
  border-radius: inherit;
	box-shadow: 3px 0 4px -2px rgba(0,0,0,.4);
}
*/

.site-icon {
  position: absolute;
  right: .6rem;
  top: .6rem;
	width: 1.5rem;
	height: 1.5rem;
	fill: #FFF;
}
.site-account {
  position: absolute;
  bottom: .3rem;
  right: .5rem;
  width: 2rem;
  height: 2rem;
  fill: #FFF;
  opacity: .7;
}
.site-name {
  position: absolute;
  top: .7rem;
  left: 1rem;
  font-size: 1rem;
  font-weight: bold;
}
.site-info {
  margin: 3rem 1rem .5rem;
  font-size: .8rem;
}
.site-info strong {
  font-size: 1rem;
  font-weight: bold;
}
</style>
