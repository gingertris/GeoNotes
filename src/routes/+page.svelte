
<script lang="ts">
    import Map from "$lib/Map.svelte";
    import type { Marker } from 'leaflet';
	import type { PageData } from "./$types";
	import { onMount } from "svelte";
    let selectedMarker:Marker | null, existingMarkers:any[], markerData: any = null;

    export let data: PageData;

    const loadMarkers = (c:any) => {
        existingMarkers = data.markers ?? []
    }

</script>



<h1>GeoNotes</h1>

{#if !data.user}
    <a href="/auth/login/discord">Log in with Discord</a>
{:else}
    <span>Logged in as {data.user.username} </span>
    <a href="/auth/logout">Log out</a>
{/if}



<div class="flex flex-row space-x-4 p-4">
    <div class="{selectedMarker ? "basis-3/4" : "basis-full"}" use:loadMarkers>
       <Map bind:selectedMarker bind:existingMarkers bind:markerData/> 
    </div>
    
    {#if selectedMarker && !markerData}
    <div class="basis-1/4 rounded-md outline outline-slate-700 p-4 bg-slate-200">
        <form method="POST">
                <label class="label">
                    <span>Title</span>
                    <input class="input" type="text" name="title"/>
                </label>

                <label class="label">
                    <span>Note</span>
                    <textarea class="textarea resize-none" rows="20" name="note"/>
                </label>
                


                <label class="label">
                    <span>Latitude: {selectedMarker?.getLatLng().lat}</span>
                    <input type="hidden" value={selectedMarker?.getLatLng().lat} name="lat"/>
                </label>
                
                <label class="label">
                    <span>Longitude: {selectedMarker?.getLatLng().lng}</span>
                    <input type="hidden" value={selectedMarker?.getLatLng().lng} name="lng" />
                </label>
   
                <input type="submit" value="Save" class="btn variant-filled"/>
        </form>
    </div>

    {:else if markerData}
    <div class="basis-1/4 rounded-md outline outline-slate-700 p-4 bg-slate-200">
        <h3>{markerData.title}</h3>
        <p>{markerData.note}</p>
    </div>
    {/if}

    
</div>


