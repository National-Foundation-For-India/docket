<script>
  import { onMount } from 'svelte'
  import { supabase } from '../lib/supabaseClient'
  import Main from '../lib/docketMain.svelte'
  import Auth from '../lib/Auth.svelte'
  let session = null
  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session
    })

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session
    })
  })
</script>
{#if !session}
  <Auth />
  {:else}
  <Main {session} />
  {/if}