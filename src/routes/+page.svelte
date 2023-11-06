
<script lang="ts">
    import Map from "$lib/Map.svelte";
    import type { Marker } from 'leaflet';
	import type { ActionData, PageData } from "./$types";
    import type {Note} from '@prisma/client'
    import MarkdownIt from 'markdown-it';

    let selectedMarker:Marker | null, notes:Note[], selectedNote: Note | null= null;


    const md = new MarkdownIt();
    $: selectedNoteHTML = md.render(selectedNote?.body ?? "")

    let isEdit = false;
    $: if(selectedMarker) {
        isEdit=true
    } else{
        isEdit=false
    }

    export let data: PageData;
    export let form: ActionData;

    const loadMarkers = (c:any) => {
        notes = data.notes ?? []
    }

</script>

<div class="flex flex-row space-x-4 p-4 h-[80vh]">

    {#if data.user}
    <div class="{isEdit || selectedNote ? "basis-3/4" : "basis-full"}" use:loadMarkers>
        <Map bind:selectedMarker bind:notes={notes} bind:selectedNote/> 
    </div>
    {:else}
    <div>
        Please log in to use GeoNotes.
    </div>
    {/if}

    
    {#if isEdit}
    <div class="basis-1/4 rounded-md p-3 bg-slate-200">
        <form action="?/save"  method="POST">
            <div class="space-y-2">
                <label class="label">
                    <span>Title</span>
                    <input class="input" type="text" name="title" value="{selectedNote ? selectedNote.title : ""}"/>
                </label>

                <label class="label">
                    <span>Body</span>
                    <textarea class="textarea resize-none" rows="19" name="body" value="{selectedNote ? selectedNote.body : ""}"/>
                </label>
                


                <label class="label">
                    <span>Latitude: {selectedNote ? selectedNote.lat : selectedMarker?.getLatLng().lat}</span>
                    <input type="hidden" value={selectedNote ? selectedNote.lat : selectedMarker?.getLatLng().lat} name="lat"/>
                </label>
                
                <label class="label">
                    <span>Longitude: {selectedNote ? selectedNote.lng : selectedMarker?.getLatLng().lng}</span>
                    <input type="hidden" value={selectedNote ? selectedNote.lng : selectedMarker?.getLatLng().lng} name="lng" />
                </label>

                {#if selectedNote}
                <input type="hidden" value="{selectedNote.id}" name="id" />
                {/if}

                <input type="submit" value="Save" class="btn variant-filled-primary"/>
                <button class="btn variant-filled-surface" on:click={() => {isEdit=false;}}>Cancel</button>
            </div>
                
        </form>
    </div>

    {:else if selectedNote}
    <div class="flex flex-col basis-1/4 rounded-md outline outline-slate-700 p-4 bg-slate-200">
        <header class="text-lg"><b>{selectedNote.title}</b></header>
        <main class="flex-grow prose">{@html selectedNoteHTML}</main>
        <footer>
            <div class="flex">
                <div class="flex-grow">
                    <p>Latitude: {selectedNote.lat}</p>
                    <p>Longitude: {selectedNote.lng}</p>
                </div>
                <form action="?/delete" method="POST">
                    <button class="btn variant-filled-primary" on:click={() => {isEdit=true}}>Edit</button>
                    <input type="hidden" name="id" value="{selectedNote.id}">
                    <input type="submit" class="btn variant-filled-error" value="Delete" />
                </form>
            </div>

        </footer>
    </div>
    {/if}

    
</div>


