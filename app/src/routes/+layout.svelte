<script>
    import "../app.css";
    import { onMount } from 'svelte'
    import { pwaInfo } from 'virtual:pwa-info';
    onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register')
      registerSW({
        immediate: true,
        onRegistered(r) {
          console.log(`SW Registered: ${r}`)
        },
        onRegisterError(error) {
          console.log('SW registration error', error)
        }
      })
    }
  })
    $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '' 
</script>
<svelte:head>
<title>NFI Docket</title>
<meta name="description" content="Stay organized and manage tasks efficiently with our intuitive todo app. Prioritize, set deadlines, and track progress effortlessly.">
 	{@html webManifestLink} 
</svelte:head>
<div class="min-h-screen max-w-screen flex flex-col items-center justify-center mt-4">
<header class="flex flex-col items-center">
 <a href="/"><div class="flex">
   <svg class="h-8 w-auto" viewBox="0 0 567 567" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <path id="background" d="M566.667,141.667L566.667,425C566.667,503.188 503.188,566.667 425,566.667L141.667,566.667C63.479,566.667 0,503.188 0,425L0,141.667C0,63.479 63.479,0 141.667,0L425,0C503.188,0 566.667,63.479 566.667,141.667Z" style="fill:white;"/>
    <g id="saffrom" transform="matrix(2.03582,0,0,1.39778,-309.116,-38.2446)">
        <path d="M283.333,43.925L198.746,415.284L259.264,416.201L283.333,43.925Z" style="fill:rgb(245,130,52);"/>
    </g>
    <g id="green" transform="matrix(-2.03582,0,0,1.39778,875.783,-38.2446)">
        <path d="M283.333,43.925L198.746,415.284L259.264,416.201L283.333,43.925Z" style="fill:rgb(28,174,100);"/>
    </g>
</svg>
   <span class="text-2xl font-bold">NFI docket</span></div></a> 
  <span class="text-xs uppercase font-semibold tracking-[0.4em]">Your Todo App</span>
</header>
<slot />
</div>