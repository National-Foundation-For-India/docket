<script>
  import { supabase } from "../lib/supabaseClient";
  import itemIcon from '$lib/assets/todo-item.png';
  export let docketToDoItems = null;
  let docketItem = null;
  export let session = null;
  let loading = false;
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

  const AddItem = async () => {
    try {
      loading = true;
      const updates = {
        user_id: session.user.id,
        task: docketItem,
      };
      const { error } = await supabase.from("todos").insert(updates);
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      document.getElementById("docket-item").value = "";
      loading = false;
      getItems();
    }
  };

  const CompleteItem = async (completeSignal) => {
    try {
      loading = true;
      const updates = {
        is_complete: true,
        modified_at: new Date().toISOString(),
      };
      const { error } = await supabase
        .from("todos")
        .update(updates)
        .eq("id", completeSignal.srcElement.dataset.docketid);
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
      getItems();
    }
  };

  const DeleteItem = async (deleteSignal) => {
    try {
      loading = true;
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", deleteSignal.srcElement.dataset.docketid);
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
      getItems();
    }
  };

  let date = function dateParser(date) {
    const parsedDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return parsedDate.toLocaleDateString(undefined, options);
  };
</script>

<div class="flex flex-col items-center justify-center">
  <!--  add -->
  <div class="mx-10 w-full flex flex-col items-center">
    <div>
      <label
        for="docket-item"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Add your item</label
      >
      <div class="relative mt-2 rounded-md shadow-sm">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2"
        >
          <svg
            version="1.1"
            class="h-4 w-auto"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#424242">
              <path
                d="m147.46 62.977h-116.23c-10.238 0-18.434 8.1914-18.434 18.434v116.22c0 10.238 8.1914 18.434 18.434 18.434h116.22c10.238 0 18.434-8.1914 18.434-18.434v-115.71c0.51172-10.242-8.1914-18.945-18.43-18.945zm-18.434 116.22h-78.848v-78.848h78.848z"
              />
              <path
                d="m246.27 100.35h234.5c10.238 0 18.434-8.1914 18.434-18.434 0-10.238-8.1914-18.434-18.434-18.434l-234.5 0.003906c-10.238 0-18.434 8.1914-18.434 18.434 0 10.238 8.1914 18.43 18.434 18.43z"
              />
              <path
                d="m246.27 216.57h169.98c10.238 0 18.434-8.1914 18.434-18.434-0.003906-10.238-8.1953-18.941-18.434-18.941h-169.98c-10.238 0-18.434 8.1914-18.434 18.434 0 10.238 8.1914 18.941 18.434 18.941z"
              />
              <path
                d="m147.46 295.43h-116.23c-10.238 0-18.434 8.1914-18.434 18.434l0.003906 116.22c0 10.238 8.1914 18.434 18.434 18.434h116.22c10.238 0 18.434-8.1914 18.434-18.434l-0.003906-116.22c0.51172-10.238-8.1914-18.43-18.43-18.43zm-18.434 116.22h-78.848v-78.848h78.848z"
              />
              <path
                d="m480.77 295.43h-234.5c-10.238 0-18.434 8.1914-18.434 18.434 0 10.238 8.1914 18.434 18.434 18.434h234.5c10.238 0 18.434-8.1914 18.434-18.434-0.003906-10.242-8.1953-18.434-18.434-18.434z"
              />
              <path
                d="m416.26 411.65h-169.98c-10.238 0-18.434 8.1914-18.434 18.434 0 10.238 8.1914 18.434 18.434 18.434h169.98c10.238 0 18.434-8.1914 18.434-18.434-0.003906-10.242-8.1953-18.434-18.434-18.434z"
              />
            </g>
          </svg>
        </div>
        <input
          type="text"
          name="docket-item"
          id="docket-item"
          bind:value={docketItem}
          required
          class="text-center align-top	block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
          placeholder="Buy Eggs"
        />
        <div class="absolute inset-y-0 right-0 flex items-center">
          <label for="item" class="sr-only">Item</label>
          <button
            type="button"
            id="item"
            name="item"
            class="h-full rounded-md border-0 bg-transparent py-0 px-7 text-black-500 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm bg-yellow-400"
            on:click={AddItem}>Add</button
          >
        </div>
      </div>
    </div>
  </div>

  <!--  List -->
  <div class="mb-[10vh]">
    {#if docketToDoItems}
      {#each docketToDoItems as dockerToDoItem}
        <ul role="list" class="divide-y divide-gray-100">
          <li class="flex justify-between gap-x-6 py-5">
            <div class="flex flex-col min-w-0 gap-x-4">
              <div class="flex min-w-0 gap-x-4">
                <div class="h-12 w-auto">
                  <img alt="docket Item Icon" class="h-full w-auto" src={ itemIcon } />
                </div>
                <div>
                <div class="min-w-0 flex-auto">
                  <p class="text-sm font-semibold leading-6 text-gray-900">
                    {dockerToDoItem.task}
                  </p>
                  <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                    {dockerToDoItem.is_complete
                      ? "Completed on " + date(dockerToDoItem.modified_at)
                      : "Added on " + date(dockerToDoItem.inserted_at)}
                  </p>
                </div>
                <div class="flex justify-start items-center my-4">
                  <div class="flex items-center mr-4">
                    <label for="complete" class="sr-only">complete</label>
                    <button
                      type="button"
                      id="complete-{dockerToDoItem.id}"
                      name="complete"
                      disabled={dockerToDoItem.is_complete}
                      data-docketid={dockerToDoItem.id}
                      class="flex w-full justify-center rounded-md {dockerToDoItem.is_complete
                        ? 'bg-lime-600'
                        : 'bg-yellow-600'} px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm {dockerToDoItem.is_complete
                        ? 'bg-lime-500'
                        : 'hover:bg-yellow-500'}  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 {dockerToDoItem.is_complete
                        ? 'focus-visible:outline-lime-500'
                        : 'focus-visible:outline-yellow-500'} "
                      on:click={(event = this) => CompleteItem(event)}
                      >{dockerToDoItem.is_complete ? "Done" : "Complete"}</button
                    >
                  </div>
                  <div class="flex items-center mr-4">
                    <label for="delete" class="sr-only">Delete</label>
                    <button
                      type="button"
                      id="delete-{dockerToDoItem.id}"
                      name="delete"
                      data-docketid={dockerToDoItem.id}
                      class="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                      on:click={(event = this) => DeleteItem(event)}
                      >Delete</button
                    >
                  </div>
                </div>
                </div>
              </div>
              
            </div>
          </li>
        </ul>
      {/each}
    {/if}
  </div>
</div>
