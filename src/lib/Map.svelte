<script lang="ts">
    import 'leaflet/dist/leaflet.css';
    import type {Marker} from 'leaflet'


    export let map;
    export let selectedMarker: Marker | null = null;
    export let existingMarkers: Marker[] = [];

    async function createMap(container:HTMLElement){
        const L = await import("leaflet")
        let m = L.map(container).setView([51.505, -0.09], 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(m);

        m.on('click', e => {
            if(selectedMarker) selectedMarker.removeFrom(m)
            console.log(e)
            selectedMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(m)
        })

        return m;
    }

    function mapAction(container:HTMLElement){
        map = createMap(container);
        return
    }
</script>

<div style="height:700px;width:90%" use:mapAction />