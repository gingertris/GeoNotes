<script lang="ts">
    import 'leaflet/dist/leaflet.css';
    import type {Marker} from 'leaflet'
    import type {Note} from '@prisma/client';

    let map;
    export let selectedMarker: Marker | null = null;
    export let notes: Note[] = [];
    export let selectedNote: Note|null = null;

    async function createMap(container:HTMLElement){
        const L = await import("leaflet");

        const icons = {
            red: new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            blue: new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        }


        let m = L.map(container).setView([51.505, -0.09], 5)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(m);

        m.on('click', e => {
            if(selectedMarker) selectedMarker.removeFrom(m)
            console.log(e)
            selectedMarker = L.marker([e.latlng.lat, e.latlng.lng], {
                icon:icons.blue
            }).addTo(m)
            selectedNote = null;
        })



        for(let note of notes){
            let marker = L.marker([note.lat, note.lng], {
                title: note.title,
                icon:icons.red
            }).bindPopup(note.title);
            marker.on('click', ()=>{
                selectedNote = note;
                selectedMarker?.removeFrom(m);
                selectedMarker = null;
            }).addTo(m);
        }

        return m;
    }

    function mapAction(container:HTMLElement){
        map = createMap(container);
        return
    }
</script>

<div style="height:800px;width:100%" class="rounded-md" use:mapAction />