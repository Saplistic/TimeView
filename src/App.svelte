<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Modal from "./components/Modal.svelte";
    import EventCreationForm from "./EventCreationForm.svelte";
    import type { oEvent } from "./types";

    let showModal: boolean = $state(false);
    let editMode: boolean = $state(false);
    let modalMode: number = $state(0);
    let selectedEventIndex: number | null = $state(null);

    let events: oEvent[] = $state<oEvent[]>([]); // List of events
    var timeLeft = $state<string[]>([]); // List of updating time left for each event

    function closeModal() {
        showModal = false;
    }

    function openEventModal() {
        modalMode = 0;
        showModal = true;
        selectedEventIndex = null; // Reset selection when adding a new event
    }

    function openEditModal(index: number) {
        modalMode = 0;
        if (!editMode) return; // Allow selection only in edit mode
        selectedEventIndex = index;
        showModal = true;
    }

    function saveEvent(event: oEvent) {

        if(!events.includes(event)) {
            event.id = events.length + 1;
            events.push(event); // Add new event
        }

        selectedEventIndex = null;
        showModal = false;
    }

    function toggleEditMode() {
        editMode = !editMode;
        if (!editMode) selectedEventIndex = null; // Reset selection when exiting edit mode
    }

    function formatToTimer(targetDate: Date): string {
        var targetTime = targetDate.getTime();
        let timeLeft = (targetTime - new Date().getTime());
        if (timeLeft < 0) return "00:00:00:00";

        let days, hours, minutes, seconds = 0;

        return `${Math.floor(days = timeLeft / (1000 * 60 * 60 * 24))}:${
            String(Math.floor(hours = (days % 1) * 24)).padStart(2, "0")}:${
            String(Math.floor(minutes = (hours % 1) * 60)).padStart(2, "0")}:${
            String(Math.floor(seconds = (minutes % 1) * 60)).padStart(2, "0")}`;
    }

    let interval: number;

    onMount(() => {
        const storedEvents = localStorage.getItem("events");

        // Load events from localstorage & convert date objects
        if (storedEvents) {
            events = JSON.parse(storedEvents).map((event: oEvent) => ({
                ...event,
                dateTime: new Date(event.dateTime)
            }));
        }
        timeLeft = events.map(event => formatToTimer(event.dateTime));

        // Update timeLeft every second
        interval = setInterval(() => {
            timeLeft = events.map((event) => {
                if (event.isLocal) { // Apply local timezone offset to the date when it's marked as 'isLocal'
                    let updatedDateTime = new Date(event.dateTime.getTime() + (new Date().getTimezoneOffset() * 60 * 1000));
                    return formatToTimer(updatedDateTime);
                }
                return formatToTimer(event.dateTime);
            });
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    $effect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    });

    function promptDeleteEvent(index: number) {
        modalMode = 1;
        selectedEventIndex = index;
        showModal = true;
    }

    function deleteEvent(event: Event) {
        events.splice(selectedEventIndex!, 1);
        event.preventDefault();
        showModal = false;
    }

</script>

<main class="bg-gray-900">
   <div class="flex flex-col w-full min-h-screen main p-4">
      <div class="m-4 flex gap-4">
         <button onclick={openEventModal} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Event
         </button>
         <button onclick={toggleEditMode} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            {editMode ? "Exit Edit Mode" : "Edit Events"}
         </button>
      </div>

      {#each events as event, i}
         <div onclick={() => {openEditModal(i)}}
              class="relative w-full h-32 md:h-40 lg:h-52 flex items-center justify-center rounded-lg overflow-hidden shadow-lg transition-all duration-300 mb-2 last:mb-0 cursor-pointer"
              style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));">

            {#if event.coverImgUrl}
               <div class="absolute inset-0 bg-cover bg-center opacity-30" style="background-image: url({event.coverImgUrl})"></div>
            {/if}

            <!-- Overlay text -->
            <div class="relative text-center text-white px-4">
               <h2 class="text-lg md:text-xl lg:text-2xl font-semibold tracking-wider">{event.name}</h2>
               <p class="text-2xl md:text-3xl lg:text-4xl font-bold mt-1">{timeLeft[i]}</p>
            </div>

            {#if editMode}
               <div class="absolute top-2 right-2 flex space-x-2">
                  <!-- Edit Button -->
                  <button class="bg-transparent border border-yellow-500 text-yellow-500 px-3 py-1 rounded-lg text-sm hover:bg-yellow-500 hover:text-black transition-all duration-200">
                      ✏ Edit
                  </button>

                  <!-- Delete Button -->
                  <button onclick={(event) => { promptDeleteEvent(i); event.stopPropagation() } }
                          class="bg-transparent border border-red-500 text-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-all duration-200">
                     🗑 Delete
                  </button>
               </div>
            {/if}
         </div>
      {/each}
   </div>

   <Modal bind:show={showModal}>
      {#if modalMode === 0}
      <!-- Create/Edit -->
         <EventCreationForm saveEvent={saveEvent} eventToEdit={ (selectedEventIndex !== null) ? events[selectedEventIndex] : null }/>
         <div class="flex justify-end mt-6">
            <button onclick={closeModal} class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 mr-2">
               Cancel
            </button>
            <button form="event_create" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
               Save
            </button>
         </div>

      {:else if modalMode === 1}
      <!-- Delete Confirmation -->
         <p>Are you sure you permanently want to delete this event?</p>

         <div class="flex justify-end mt-6">
            <button onclick={closeModal} class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 mr-2">
               Cancel
            </button>
            <button onclick="{deleteEvent}" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
               Confirm
            </button>
         </div>
      {/if}
   </Modal>

</main>
