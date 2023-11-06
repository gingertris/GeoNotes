<script>
  import "../app.css";
  export let data;
</script>

<div class="flex p-4">
  <h1 class="text-xl flex-grow">GeoNotes</h1>

  <div>
    {#if !data.user}
        <a href="/auth/login/discord" class="btn btn-sm variant-outline-secondary">Log in with Discord</a>
    {:else}
        <span class="p-2">Logged in as <b>{data.user.username}</b> </span>
        <a href="/auth/logout" class="btn btn-sm variant-outline-secondary">Log out</a>
    {/if}
  </div>



</div>



<slot />