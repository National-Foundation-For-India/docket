<script>
    import { onMount } from "svelte";
    import { supabase } from "../lib/supabaseClient";
    export let session = null;
    let docketToDoItems = null;
    import DocketUser from "../components/DocketUser.svelte";
    import DocketList from "../components/DocketList.svelte";
    let loading = false;
    onMount(() => {
        getItems();
    });
    const getItems = async () => {
        try {
            loading = true;
            const { data, error, status } = await supabase
                .from("todos")
                .select()
                .eq("user_id", session.user.id);

            if (error && status !== 406) throw error;

            if (data) {
                docketToDoItems = data;
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            loading = false;
        }
    };
</script>

<div class="flex flex-col m-10">
    <DocketUser {session} />
    <DocketList {session} {docketToDoItems} />
</div>
