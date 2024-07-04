<script>
  import { supabase } from "../lib/supabaseClient";
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
    return parsedDate.toLocaleDateString(undefined,options);
  };
</script>

<div class="mt-24 flex flex-col items-center justify-center">
  <!--  add -->
  <div class="mx-10 flex flex-col items-center">
    <div>
      <label
        for="docket-item"
        class="block text-sm font-medium leading-6 text-gray-900">Add your item</label
      >
      <div class="relative mt-2 rounded-md shadow-sm">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2"
        >
     <svg version="1.1" class="h-4 w-auto" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <g fill="#424242">
             <path d="m147.46 62.977h-116.23c-10.238 0-18.434 8.1914-18.434 18.434v116.22c0 10.238 8.1914 18.434 18.434 18.434h116.22c10.238 0 18.434-8.1914 18.434-18.434v-115.71c0.51172-10.242-8.1914-18.945-18.43-18.945zm-18.434 116.22h-78.848v-78.848h78.848z"/>
             <path d="m246.27 100.35h234.5c10.238 0 18.434-8.1914 18.434-18.434 0-10.238-8.1914-18.434-18.434-18.434l-234.5 0.003906c-10.238 0-18.434 8.1914-18.434 18.434 0 10.238 8.1914 18.43 18.434 18.43z"/>
             <path d="m246.27 216.57h169.98c10.238 0 18.434-8.1914 18.434-18.434-0.003906-10.238-8.1953-18.941-18.434-18.941h-169.98c-10.238 0-18.434 8.1914-18.434 18.434 0 10.238 8.1914 18.941 18.434 18.941z"/>
             <path d="m147.46 295.43h-116.23c-10.238 0-18.434 8.1914-18.434 18.434l0.003906 116.22c0 10.238 8.1914 18.434 18.434 18.434h116.22c10.238 0 18.434-8.1914 18.434-18.434l-0.003906-116.22c0.51172-10.238-8.1914-18.43-18.43-18.43zm-18.434 116.22h-78.848v-78.848h78.848z"/>
             <path d="m480.77 295.43h-234.5c-10.238 0-18.434 8.1914-18.434 18.434 0 10.238 8.1914 18.434 18.434 18.434h234.5c10.238 0 18.434-8.1914 18.434-18.434-0.003906-10.242-8.1953-18.434-18.434-18.434z"/>
             <path d="m416.26 411.65h-169.98c-10.238 0-18.434 8.1914-18.434 18.434 0 10.238 8.1914 18.434 18.434 18.434h169.98c10.238 0 18.434-8.1914 18.434-18.434-0.003906-10.242-8.1953-18.434-18.434-18.434z"/>
            </g>
           </svg>
        </div>
        <input
          type="text"
          name="docket-item"
          id="docket-item"
          bind:value={docketItem}
          required
          class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
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
  {#if docketToDoItems}
    {#each docketToDoItems as dockerToDoItem}
      <ul role="list" class="divide-y divide-gray-100">
        <li class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <svg
              class="h-12 w-12"
              version="1.1"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="m100 50c0 27.613-22.387 50-50 50s-50-22.387-50-50 22.387-50 50-50 50 22.387 50 50"
                  fill={dockerToDoItem.is_complete ? "#c2dc63" : "#FFD65B"}
                />
                <path
                  d="m53.887 49.359-5.707 5.707-1.9609-1.9609c-0.98438-0.98438-2.5781-0.98438-3.5625 0s-0.98438 2.5781 0 3.5625l3.7422 3.7422c0.49219 0.49219 1.1367 0.73828 1.7812 0.73828 0.64453 0 1.2891-0.24609 1.7812-0.73828l7.4883-7.4883c0.98438-0.98438 0.98438-2.5781 0-3.5625s-2.5781-0.98438-3.5625 0z"
                  fill="#424242"
                />
                <path
                  d="m71.543 51.355c0-5.0508-0.27734-10.152-0.82812-15.16-0.29297-2.7461-1.5-5.3633-3.4023-7.3711-1.25-1.3047-2.7461-2.3086-4.3867-2.957-0.94531-2.4883-3.332-4.207-6.1328-4.207h-13.586c-2.8008 0-5.1875 1.7188-6.1289 4.2031-1.6406 0.65234-3.1406 1.6562-4.3984 2.9688-1.8945 2-3.0977 4.6133-3.3906 7.3555-0.55078 5.0156-0.83203 10.117-0.83203 15.168s0.27734 10.152 0.82812 15.16c0.29297 2.7461 1.5 5.3633 3.4102 7.3789 1.957 2.0273 4.4414 3.3086 7.1797 3.7031 3.3594 0.49609 6.7422 0.74219 10.125 0.74219 3.3789 0 6.7617-0.24609 10.113-0.74219 2.7422-0.39844 5.2305-1.6797 7.2031-3.7227 1.8945-2 3.0977-4.6133 3.3906-7.3555 0.55469-5.0117 0.83594-10.113 0.83594-15.164zm-28.336-24.656h13.586c0.79297 0 1.4414 0.58203 1.5117 1.3555 0.007812 0.09375 0.023437 0.1875 0.042968 0.27734-0.003906 0.046875-0.015625 0.09375-0.019531 0.14062-0.007813 0.054688-0.011719 0.10938-0.023437 0.16016-0.007813 0.03125-0.023438 0.058594-0.03125 0.089844-0.019532 0.0625-0.039063 0.12891-0.066407 0.19141-0.03125 0.066407-0.070312 0.125-0.10938 0.1875-0.011718 0.019532-0.023437 0.042969-0.039062 0.066407-0.22656 0.31641-0.56641 0.54297-0.96094 0.62109-0.097656 0.019532-0.19922 0.03125-0.30469 0.03125l-13.586-0.007812c-0.20312 0-0.40234-0.039062-0.57812-0.11328-0.53906-0.21875-0.92969-0.73828-0.97266-1.3828 0.019531-0.085937 0.03125-0.17578 0.039062-0.26562 0.070313-0.76953 0.71875-1.3516 1.5117-1.3516zm22.496 39.281c-0.17578 1.6562-0.90234 3.2305-2.0234 4.418-1.1719 1.2148-2.6523 1.9844-4.2891 2.2188-6.2305 0.91797-12.551 0.91797-18.785 0-1.6289-0.23438-3.1094-1-4.2656-2.1992-1.1406-1.2031-1.8633-2.7773-2.043-4.4414-0.53125-4.832-0.80078-9.75-0.80078-14.617s0.26953-9.7852 0.80078-14.625c0.17578-1.6562 0.90234-3.2305 2.0312-4.4219 0.33203-0.34375 0.69141-0.65625 1.0703-0.92578 0 0.003906 0.003906 0.003906 0.003906 0.007812 0.125 0.23047 0.26562 0.44922 0.41797 0.66016 0.042969 0.058593 0.089844 0.11719 0.13281 0.17578 0.12109 0.16016 0.25 0.3125 0.38281 0.46094 0.046874 0.050782 0.089843 0.10156 0.13672 0.15234 0.17969 0.1875 0.36719 0.36328 0.57031 0.52734 0.035156 0.027344 0.070312 0.050781 0.10547 0.078125 0.17187 0.13672 0.35156 0.26172 0.53516 0.37891 0.066406 0.042969 0.13281 0.082031 0.19922 0.12109 0.18359 0.10938 0.375 0.20703 0.57031 0.29688 0.046875 0.019531 0.089844 0.046875 0.13672 0.066406 0.24219 0.10547 0.48828 0.19141 0.74219 0.26953 0.0625 0.019531 0.12891 0.03125 0.19531 0.050781 0.20312 0.054688 0.40625 0.097657 0.61719 0.12891 0.078125 0.011719 0.15234 0.027343 0.23047 0.035156 0.27344 0.035156 0.54688 0.058594 0.82812 0.058594h13.586c0.28125 0 0.55469-0.023438 0.82813-0.058594 0.078124-0.011719 0.15234-0.023437 0.23047-0.035156 0.20703-0.035157 0.41406-0.078125 0.61719-0.12891 0.066406-0.015624 0.12891-0.03125 0.19531-0.050781 0.25391-0.074219 0.50391-0.16406 0.74219-0.26953 0.046875-0.019531 0.089844-0.046875 0.13672-0.066406 0.19531-0.089844 0.38672-0.19141 0.57031-0.29688 0.066406-0.039063 0.13281-0.078125 0.19922-0.12109 0.18359-0.11719 0.36328-0.24219 0.53516-0.37891 0.035156-0.027344 0.074219-0.050781 0.10547-0.078125 0.19922-0.16406 0.39062-0.33984 0.57031-0.52344 0.046875-0.050781 0.09375-0.10156 0.14062-0.15625 0.13281-0.14844 0.26172-0.30078 0.38281-0.45703 0.046875-0.058594 0.089843-0.11719 0.13672-0.17969 0.14844-0.21094 0.28906-0.42969 0.41406-0.66016 0-0.003906 0.003906-0.003906 0.003906-0.007812 0.37891 0.26953 0.73438 0.57812 1.0586 0.91797 1.1406 1.2031 1.8633 2.7773 2.043 4.4414 0.53125 4.832 0.80078 9.75 0.80078 14.617 0.003906 4.8594-0.26562 9.7773-0.79688 14.617z"
                  fill="#424242"
                />
              </g>
            </svg>
            <div class="min-w-0 flex-auto">
              <p class="text-sm font-semibold leading-6 text-gray-900">
                {dockerToDoItem.task}
              </p>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                {dockerToDoItem.is_complete ? "Completed on "+date(dockerToDoItem.modified_at) : "Added on "+date(dockerToDoItem.inserted_at)}
              </p>
            </div>
            <div class="flex items-center">
              <label for="complete" class="sr-only">complete</label>
              <button
                type="button"
                id="complete-{dockerToDoItem.id}"
                name="complete"
                disabled={dockerToDoItem.is_complete}
                data-docketid={dockerToDoItem.id}
                class="flex w-full justify-center rounded-md {dockerToDoItem.is_complete ? "bg-lime-600" : "bg-yellow-600"} px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm {dockerToDoItem.is_complete ? "bg-lime-500" : "hover:bg-yellow-500"}  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 {dockerToDoItem.is_complete ? "focus-visible:outline-lime-500" : "focus-visible:outline-yellow-500"} "
                on:click={(event = this) => CompleteItem(event)}
                >{dockerToDoItem.is_complete ? "Done" : "Complete"}</button
              >
            </div>
            <div class="flex items-center">
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
        </li>
      </ul>
    {/each}
  {/if}
</div>
