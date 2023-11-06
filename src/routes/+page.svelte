
<script lang="ts">
    import Map from "$lib/Map.svelte";
    import type {Marker, Map as LMap, latLng} from 'leaflet';
	import type { PageData } from "./$types";
    let selectedMarker:Marker | null, existingMarkers:Marker[], map: LMap;

    export let data: PageData;

</script>



<h1>GeoNotes</h1>

{#if !data.user}
    <a href="/auth/login/discord">Log in with Discord</a>
{:else}
    <span>Logged in as {data.user.username} </span>
    <a href="/auth/logout">Log out</a>
{/if}



<div class="flex flex-row space-x-4 p-4">
    <div class="{selectedMarker ? "basis-4/5" : "basis-full"}">
       <Map bind:selectedMarker bind:existingMarkers bind:map /> 
    </div>
    
    {#if selectedMarker}
    <div class="basis-1/5">
        <form>
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
    {/if}

    
</div>


