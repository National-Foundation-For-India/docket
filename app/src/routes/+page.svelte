<script>
  import { onMount } from 'svelte'
  import { supabase } from '../lib/supabaseClient'
  import Auth from '../components/Auth.svelte'
  import DocketMain from '../components/DocketMain.svelte'
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
<div>
  <Auth />
</div>

  {:else}
  <DocketMain {session}/>
  {/if}