<script lang="ts">
    import Map from "$lib/Map.svelte";
    import type {Marker, Map as LMap} from 'leaflet';
	let selectedMarker:Marker | null, existingMarkers:Marker[], map: LMap;
</script>



<h1>GeoNotes</h1>
<Map bind:selectedMarker bind:existingMarkers bind:map />

<div>

</div>



