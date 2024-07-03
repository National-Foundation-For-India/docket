<script>
    import { supabase } from "../lib/supabaseClient";

    let loading = false;
    let email = "";
    let password = "";

    const handleLogin = async () => {
        try {
            loading = true;
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            loading = false;
        }
    };
</script>

<div class="px-12 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" on:submit|preventDefault={handleLogin}>
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
                    bind:value={email}
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between">
                <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Password</label
                >
                <div class="text-sm">
                    <a
                        href="#"
                        class="font-semibold text-yellow-600 hover:text-yellow-500"
                        >Forgot password ?</a
                    >
                </div>
            </div>
            <div class="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    minlength="8"
                    bind:value={password}
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>

        <div>
            <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                disabled={loading}>{loading ? "Loading" : "Sign in"}</button
            >
        </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
        New user?
        <a
            href="/docket-up"
            class="font-semibold leading-6 text-yellow-600 hover:text-yellow-500"
            >Docket up!</a
        >
    </p>
</div>
