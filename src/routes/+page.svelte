
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



<div style="display:flex; gap:10px">
    <Map bind:selectedMarker bind:existingMarkers bind:map />
    <div style="width:25%">
        <form>
            <div>
                <p>Title</p>
                <input type="text" name="title" />
            </div>
            <div>
                <p>Note</p>
                <textarea name="note" />
            </div>
            <div>
                <p>Latitude: {selectedMarker?.getLatLng().lat}</p>
                <p>Longitude: {selectedMarker?.getLatLng().lng}</p>
                <input type="submit" value="Save"/>
            </div>
            <input type="hidden" value={selectedMarker?.getLatLng().lat} />
        </form>
    </div>
</div>


