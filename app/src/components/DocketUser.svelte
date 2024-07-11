<script>
  export let session = null;
  import { supabase } from "../lib/supabaseClient";
  import profileIcon from '$lib/assets/profile.png';
  </script>

<div class="flex justify-between items-center h-full w-full bg-yellow-300">
  <div class="flex items-center">
    <img alt="Profile Photo" class="h-12 w-12 mx-5" src={profileIcon} />
  <div class="flex flex-col">
    <span>{session.user.user_metadata.first_name}</span>
    <span class="text-xs leading-5 text-gray-500"
      >{session.user.user_metadata.username}</span
    ></div>
  </div>
    <span class="leading-5 m-5"
      ><button
        type="button"
        class="button block flex w-full justify-center rounded-md bg-yellow-600 px-1.5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
        on:click={() => supabase.auth.signOut()}
      >
        Sign Out
      </button></span
    >
</div>