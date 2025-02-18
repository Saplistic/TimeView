<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Modal from "./components/Modal.svelte";
    import EventCreationForm from "./EventCreationForm.svelte";
    import type { oEvent } from "./types";

    let showModal: boolean = $state(false);
    let editMode: boolean = $state(false);
    let selectedEventIndex: number | null = $state(null);

    let events = $state<oEvent[]>([
        { id: 1, name: "New Year 2026", dateTime: new Date("2026-01-01T00:00:00Z"), isLocal: true, description: "", coverImgUrl: "" },
        { id: 2, name: "Summer Festival", dateTime: new Date("2025-02-21T00:00:00"), isLocal: false, description: "", coverImgUrl: "https://www.trendycovers.com/covers/1322932923.jpg" },
        { id: 3, name: "Conference", dateTime: new Date("2025-03-15T09:00:00"), isLocal: false, description: "", coverImgUrl: "" },
    ]);

    function openEventModal() {
        showModal = true;
        selectedEventIndex = null; // Reset selection when adding a new event
    }

    function openEditModal(index: number) {
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

    let timeLeft = $state(events.map(event => formatToTimer(event.dateTime)));

    let interval: number;
    onMount(() => {
        // Update timeLeft every second
        interval = setInterval(() => {
            timeLeft = events.map((event) => {
                if (event.isLocal) { // Apply local time zone offset to Event date's set to local
                    var updatedDateTime = new Date(event.dateTime.getTime() + (new Date().getTimezoneOffset() * 60 * 1000));
                    return formatToTimer(updatedDateTime);
                }
                return formatToTimer(event.dateTime);
            });
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

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
         <div onclick={() => { openEditModal(i) }}
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
               <button class="absolute top-2 right-2 bg-transparent border border-yellow-500 text-yellow-500 px-3 py-1 rounded-lg text-sm
                          hover:bg-yellow-500 hover:text-black transition-all duration-200">
                  ✏ Edit
               </button>
            {/if}
         </div>
      {/each}
   </div>

   <Modal bind:show={showModal}>
      <EventCreationForm saveEvent={saveEvent} eventToEdit={ (selectedEventIndex !== null) ? events[selectedEventIndex] : null }/>

      <!--Confirmation button section-->
      <button slot="confirm" form="event_create" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
         Save
      </button>
   </Modal>
</main>
