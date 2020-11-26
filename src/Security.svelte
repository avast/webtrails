<script>
import { trends } from './store.js';

import Timeline from './Charts/Timeline.svelte';
import Nodata from './components/Nodata.svelte';

let leaks = [];
let unsecure = [];
let focusElement = null;

const LEAK_TYPES = [ 'CREDITCARD', 'IDCARD', 'LOCATION', 'EMAIL', 'PASSWORD' ];

function filter(e) {
	focusElement = e.detail;
}
function focus(site) {
	console.log('Focus', site);
}

trends.subscribe(value => {
	value.then(res => {
		unsecure = res.unsecure;
//console.log(res);
		// remap leaks to domains
		leaks = Object.entries(res.leaks.reduce((o, i) => {
			if (!o[i.domain]) o[i.domain] = [];
			o[i.domain].push(i);
			return o;
		}, {})).map(entry => {
			let leaks = entry[1];
			// protocols used in a domain
			let protocols = leaks.reduce((p, l) => {
				if (p.indexOf(l.protocol) == -1) {
					p.push(l.protocol);
				}
				return p;
			}, []);

			// list included types
			let types = leaks.reduce((t, l) => {
				if (t.indexOf(l.type) == -1) {
					t.push(l.type);
				}
				return t;
			}, []);

			return {
					domain: entry[0],
					leaks,
					protocols,
					types
			}
		})
		// put http: protocol first
		.sort((a, b) =>  {
			return (a.protocols.indexOf('http:') > -1 ) ? -1 : 1;
		});
	});
});

</script>


{#if leaks.length == 0}
	<Nodata />
{:else}


	<h3>Major security leak events</h3>
	<p>History of your private information leaks in your browsing data.</p>
	<Timeline data={leaks} on:filter={filter} />

	<h3>Private information leaks by site</h3>
	<p>What data could be sniffed through an unsecure connection?</p>
	<p>How can <a href="https://www.avast.com/secureline-vpn" target="_blank">Private mode or VPN help you protect yourself</a>?</p>
	{#if focusElement != null}
		<p>
			<button on:click={()=> focusElement = null } class="button" >Clear filter</button>
		</p>
	{/if}
	<div class="sites">
		{#each leaks as site}
			{#if focusElement == null || focusElement.domain == site.domain}
		  <div class="site" on:click={focus(site)} class:http={site.protocols.indexOf('http:') > -1}>

			<div class="leaks">
				{#each LEAK_TYPES as type}
					<svg class="types"
						class:active={site.types.indexOf(type) > -1}
						class:http={site.protocols.indexOf('http:') > -1}>
						 <use xlink:href="icons.svg#{type}"></use>
					</svg>
				{/each}
				<svg class="types"
					class:active={site.protocols.indexOf('http:') > -1}
					class:http={site.protocols.indexOf('http:') > -1}>
					 <use xlink:href="icons.svg#HTTP"></use>
				</svg>
			</div>

		    <h4>{site.domain}</h4>
				{#if site.protocols.indexOf('http:') > -1}
				<p class="http-warn">Site is using <strong>http</strong>. Everyone can read the communication between you and {site.domain}.</p>
				{/if}
		    <table>


					{#each site.leaks.slice(0,3) as leak}
			      <tr class="email">
			        <td class="type">
							<svg>
								 <use xlink:href="icons.svg#{leak.type}"></use>
							</svg>
							</td>
			        <td>{leak.leak}</td>
			      </tr>
					{/each}
					{#if site.leaks.length > 3}
						<tr><td>...</td></tr>
					{/if}
		    </table>

		  </div>
			{/if}
		{/each}
	</div>

	<!--h3>Unsecured sites (http)</h3>

	<div class="sites">
		{#each unsecure as site}
		  <div class="site">
		    <h4>{site.domain}</h4>
		    <table>
					{#each site.urls as urls}
			      <tr >
			        <td>{urls.url}</td>
			      </tr>
					{/each}
		    </table>
		  </div>
		{/each}
	</div-->

{/if}

<style>

.sites {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}

.site {
	width: calc(33% - 1rem);
  background: var(--highlight-2-1);
  min-height: 12rem;
  border-radius: 1rem;
  padding: 1rem;
	margin-bottom: 1rem;
	margin-right: 1rem;
	cursor: pointer;
	color: #FFF;
}
.site:nth-child(3n) {
	margin-right: 0rem;
}

.site.http {
	background: linear-gradient(180deg, rgba(255,0,0,1) 20%, var(--highlight-2-1) 55%);
}
.site > h4 {
	font-size: 1.2rem;
	color: #FFF;
	padding: .5rem 0;
}
.http-warn {
	font-size: 0.8rem;
}
table {
  width: 100%;
}
td {
	color: #FFF;
  padding: .2rem .2rem .2rem 0;
	font-size: .7rem;
	white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
	max-width: 10rem;
}

.leaks {
	width: 100%;
	display: flex;
	justify-content: space-between;
}

.types {
	width: 1.4rem;
	height: 1.4rem;
	fill: #FFF;
	opacity: .1;
}

.types.active {
	opacity: 1;
}
.types.active.http {
	fill: #FFF;
}
td.type {
	width: 1.4rem;
	padding: .2rem;
}
.type svg {
	width: 1rem;
	height: 1rem;
	fill: #FFF;

}

button {
	display: inline-block;
	padding: .5rem 2rem;
	border-radius: 1rem;
	background:  var(--highlight-2-1);
	color: #FFF;
	cursor: pointer;
}

</style>
