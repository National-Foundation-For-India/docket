<script>
    export let form;

    
</script>
{#if !form}
<form class="m-12" method="POST">
    <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
                Profile
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div>
                    <label
                        for="username"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Username</label
                    >
                    <div class="mt-2">
                        <div
                            class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600 sm:max-w-md"
                        >
                            <span
                                class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
                                >docket-</span
                            >
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autocomplete="username"
                                required
                                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="a unique user name"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label
                        for="password"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Password</label
                    >
                    <div class="mt-2">
                        <div
                            class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-600 sm:max-w-md"
                        >
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autocomplete="new-password"
                                required
                                minlength="8"
                                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="a strong password"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label
                        for="first-name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >First name</label
                    >
                    <div class="mt-2">
                        <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            required
                            autocomplete="given-name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="last-name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Last name</label
                    >
                    <div class="mt-2">
                        <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autocomplete="family-name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Email address</label
                    >
                    <div class="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label
                        for="country"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Country</label
                    >
                    <div class="mt-2">
                        <select
                            id="country"
                            name="country"
                            autocomplete="country-name"
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>India</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-6 flex items-center justify-center gap-x-6">
            <button
                type="button"
                class="text-sm font-semibold leading-6 text-gray-900"
                >Clear</button
            >
            <button
                type="submit"
                class="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                >Register Me!</button
            >
        </div>
    </div>
</form>
  {:else}
  <div class="flex flex-col justify-center items-center h-[80vh]">
    <span class="my-4 text-base font-semibold leading-7 text-gray-900">Registration Successful!</span>
    <a class="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600" href="/">Login Now.</a>
  </div>
  
  {/if}

