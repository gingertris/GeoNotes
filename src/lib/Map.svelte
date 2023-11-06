<script lang="ts">
    import 'leaflet/dist/leaflet.css';
    import type {Marker} from 'leaflet'

    let map;
    export let selectedMarker: Marker | null = null;
    export let existingMarkers: any[] = [];
    export let markerData = null;

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
            markerData = null;
        })

        var redIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        for(let marker of existingMarkers){
            let newMarker = L.marker([marker.lat, marker.lng], {
                title: marker.title,
                icon:redIcon
            }).bindPopup(marker.title);
            newMarker.on('click', ()=>{
                markerData = {title: marker.title, note:marker.note};
            }).addTo(m);
        }

        return m;
    }

    function mapAction(container:HTMLElement){
        map = createMap(container);
        return
    }
</script>

<div style="height:700px;width:100%" use:mapAction />