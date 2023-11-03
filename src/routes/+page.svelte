<script lang="ts">
	import Map from "$lib/Map.svelte";
	import type { Marker } from "leaflet";
    import type {Map as LMap} from 'leaflet'
    let selectedMarker: Marker | null;
    let existingMarkers: Marker[]
    let map: LMap;

    function addMarker() {
        if(!selectedMarker) return
        existingMarkers = [...existingMarkers, selectedMarker];
        selectedMarker.removeFrom(map);
        selectedMarker = null
    }

</script>



<h1>GeoNotes</h1>
<Map bind:selectedMarker bind:existingMarkers bind:map />

<div>
    <h3>Selected</h3>
    <p>Lat: {selectedMarker ? selectedMarker.getLatLng().lat : 'null'}</p>
    <p>Lng: {selectedMarker ? selectedMarker.getLatLng().lng : 'null'}</p>

    <button on:click={addMarker}>Add</button>
</div>



