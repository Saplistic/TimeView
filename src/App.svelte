<script lang="ts">
   import { onMount, onDestroy } from "svelte";
   import Modal from "./components/Modal.svelte";
   import EventCreationForm from "./EventCreationForm.svelte";
   import type { oEvent } from "./types";

   let showModal: boolean = $state(false);
   let editMode: boolean = $state(false);
   let modalMode: number = $state(0); // 0: Create/Edit, 1: Delete
   let selectedEventIndex: number | null = $state(null);
   let interval: number; // Interval for updating timeLeft

   let events: oEvent[] = $state<oEvent[]>([]); // List of events
   let sortedEvents: oEvent[] = $derived<oEvent[]>(events.slice().sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())); // Events sorted by Date for displaying
   let timeLeft = $state<string[]>([]); // List of updating time left for each event

   onMount(() => {
      const storedEvents = localStorage.getItem("events");

      // Load events from localstorage & convert date objects
      if (storedEvents) {
         events = JSON.parse(storedEvents).map((event) => ({
            ...event,
            dateTime: event.isLocal
               ? new Date(event.dateTime + (new Date(event.dateTime).getTimezoneOffset() * 60000)) // Apply local timezone offset
               : new Date(event.dateTime)
         }))
      }

      if (!localStorage.getItem("idCount")) { // Initialize idCount if it doesn't exist
         localStorage.setItem("idCount", events.at(-1) ? String(events.at(-1).id + 1) : "0");
      }

      timeLeft = sortedEvents.map(event => formatToTimer(event.dateTime));
      // Update timeLeft every second
      interval = setInterval(() => {
         timeLeft = sortedEvents.map(event => formatToTimer(event.dateTime));
      }, 1000);
   });

   onDestroy(() => {
      clearInterval(interval);
   });

   // Save events to localstorage upon changes
   $effect(() => {
      const eventsToSave = events.map(event => ({
         ...event,
         dateTime: event.isLocal
            ? event.dateTime.getTime() - (event.dateTime.getTimezoneOffset() * 60000) // Remove local timezone offset upson saving
            : event.dateTime.getTime() // Convert dateTime to timestamp
      }));
      localStorage.setItem("events", JSON.stringify(eventsToSave));
   });

   function closeModal() {
      showModal = false;
   }

   function openCreateModal() {
      modalMode = 0;
      selectedEventIndex = null; // Remove selection when Creating a new event
      showModal = true;
   }

   function openEditModal(id: number) {
      if (!editMode) return; // Only continue if edit mode is enabled
      modalMode = 0;  // Set modal to display create/edit form
      selectedEventIndex = events.findIndex(event => event.id === id);
      showModal = true;
   }

   function openDeleteModal(id: number) {
      modalMode = 1; // Set modal to display delete confirmation
      selectedEventIndex = events.findIndex(event => event.id === id);
      showModal = true;
   }

   function saveEvent(event: oEvent) {
      if(!events.includes(event)) { // If event doesnt refer to existing event -> Create new
         event.id = Number(localStorage.getItem("idCount"));
         localStorage.setItem("idCount", (event.id + 1).toString());
         events.push(event); // Add new event
      }
      selectedEventIndex = null;
      showModal = false;
   }

   function deleteEvent(event: Event) {
      events.splice(selectedEventIndex!, 1);
      event.preventDefault(); // Prevent form submission
      showModal = false;
   }

   function toggleEditMode() {
      editMode = !editMode;
      if (!editMode) selectedEventIndex = null; // Reset selection when exiting edit mode
   }

   function formatToTimer(targetDate: Date): string {
      const targetTime = targetDate.getTime();
      const timeLeft = (targetTime - new Date().getTime());
      if (timeLeft < 0) return "";

      let rest;
      const days = Math.floor(rest = timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(rest = (rest % 1) * 24);
      const minutes = Math.floor(rest = (rest % 1) * 60);
      const seconds = Math.floor(rest = (rest % 1) * 60);

      return `${days}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
   }

</script>

<main class="bg-gray-900">
   <div class="flex flex-col w-full min-h-screen main p-4">
      <div class="m-4 flex gap-4">
         <button onclick={openCreateModal} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Event
         </button>
         <button onclick={toggleEditMode} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            {editMode ? "Exit Edit Mode" : "Edit Events"}
         </button>
      </div>

      {#each sortedEvents as event, i}
         <div onclick={() => {openEditModal(event.id)}}
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
                  <button onclick={(ev) => { openDeleteModal(event.id); ev.stopPropagation(); } }
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
