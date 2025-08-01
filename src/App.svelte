<script lang="ts">
   import { onMount, onDestroy } from "svelte";
   import Modal from "./components/Modal.svelte";
   import EventCreationForm from "./EventCreationForm.svelte";
   import type { oEvent } from "./types";

   let showModal: boolean = $state(false);
   let editMode: boolean = $state(false);
   let enableSort: boolean = $state(true); // Enable sorting of events
   let togglePastEvents: boolean = $state(false); // Toggle between past and future events
   let searchQuery: string = $state(""); // Search functionality
   let modalType: number = $state(0); // 0: Create/Edit, 1: Delete, 2: Export, 3: Import
   let selectedEventIndex: number | null = $state(null);
   let countdownInterval: number; // Interval for updating timeLeft

   let events: oEvent[] = $state<oEvent[]>([]); // List of source events
   let eventsDisplayed: oEvent[] = $state<oEvent[]>([]); // Final processed list of events to display, filtered and sorted
   let eventCountdowns = $state<string[]>([]);

   let jsonPreview: string = $state(""); // Holds JSON data for previewing in the modal
   let replaceEventsImport: boolean = $state(false);
   // Handle event sorting and filtering, triggered by changes in the filtering/sorting options
   // ($effect listens to state changes from events, enableSort, and togglePastEvents)
   $effect(() => {
      let eventPipeline = events.slice(); // Create a shallow copy of events

      if (togglePastEvents) {
         eventPipeline = eventPipeline.filter((event) => event.dateTime.getTime() < Date.now());
      } else {
         eventPipeline = eventPipeline.filter((event) => event.dateTime.getTime() >= Date.now());
      }

      if (searchQuery) {
         eventPipeline = eventPipeline.filter((event) =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase())
         );
      }

       if (enableSort) {
           eventPipeline = eventPipeline.sort((a, b) =>
               togglePastEvents // Sorting direction is based on togglePastEvents
                   ? b.dateTime.getTime() - a.dateTime.getTime()
                   : a.dateTime.getTime() - b.dateTime.getTime()
           );
       }

      eventsDisplayed = eventPipeline;

      // Update countdowns to match the sorted and filtered events
      eventCountdowns = eventPipeline.map((event) => formatToTimer(event.dateTime));
   });

   onMount(() => {
      // Load events from localstorage & convert date objects
      const storedEvents = localStorage.getItem("events");
      if (storedEvents) {
         events = JSON.parse(storedEvents).map((event: any) => ({
            ...event,
            dateTime: event.isLocal
                    ? new Date(event.dateTime + new Date(event.dateTime).getTimezoneOffset() * 60000) // Adjust for local timezone offset
                    : new Date(event.dateTime)
         }));
      }

      eventCountdowns = eventsDisplayed.map((event) => formatToTimer(event.dateTime));
      countdownInterval = setInterval(() => {
         // Recalculate countdowns for the current displayed events
         eventCountdowns = eventsDisplayed.map((event) => formatToTimer(event.dateTime));
      }, 1000);
   });

   // Clear the countdown interval when the component is destroyed
   onDestroy(() => {
      clearInterval(countdownInterval);
   });

   // Update events in localstorage on event list changes
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
      modalType = 0;
      selectedEventIndex = null; // Remove selection when Creating a new event
      showModal = true;
   }

   function openEditModal(id: number) {
      if (!editMode) return; // Only continue if edit mode is enabled
      modalType = 0;  // Set modal to display create/edit form
      selectedEventIndex = events.findIndex(event => event.id === id);
      showModal = true;
   }

   function openDeleteModal(id: number) {
      modalType = 1; // Set modal to display delete confirmation
      selectedEventIndex = events.findIndex(event => event.id === id);
      showModal = true;
   }

   /**
    * Open export modal, and transform & format events to preview export
    */
   function openExportModal() {
      modalType = 2; // Set modal to export mode

      const eventsToSave = events.map(({ id, ...event }) => ({ // Exclude ID's from export
         ...event,
         dateTime: event.isLocal
            ? event.dateTime.getTime() - (event.dateTime.getTimezoneOffset() * 60000) // Unapply local timezone offset upon saving
            : event.dateTime.getTime() // Convert dateTime to timestamp
      }))

      jsonPreview = JSON.stringify(eventsToSave, null, 2);
      showModal = true;
   }

   function openImportModal() {
      modalType = 3; // Set modal to import mode
      replaceEventsImport = false;
      jsonPreview = ""; // Clear JSON preview for importing
      showModal = true;
   }

   function saveEvent(event: oEvent) {
      const eventExists: boolean = events.some(e => e.id === event.id);

      if (selectedEventIndex && eventExists) {
         events[selectedEventIndex!] = event; // Update existing event
      } else if (!selectedEventIndex && !eventExists) {
         event.id = events.at(-1)
            ? events.at(-1)!.id! + 1
            : 0;
         events.push(event); // Create new event
      } else {
         return alert("Error saving: Event ID already exists or no event selected.");
      }

      selectedEventIndex = null;
      showModal = false;
   }

   function deleteEvent(event: Event) {
      events.splice(selectedEventIndex!, 1);
      event.preventDefault(); // Prevent form submission
      showModal = false;
   }

   function saveExportedFile() {
      const blob = new Blob([jsonPreview], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "events.json";
      a.click();

      URL.revokeObjectURL(url);
   }

   function importFromPreview() {
      try {
         const importedEvents: any[] = JSON.parse(jsonPreview);

         if (replaceEventsImport) {
            if (!confirm(`Are you sure you want to replace all existing events (${events.length})? This cannot be undone`)) return;
            events = [];
         }

         // Assign new IDs to imported events
         const maxId = events.length > 0 ? Math.max(...events.map(e => e.id)) : -1;
         const newEvents: oEvent[] = importedEvents.map((event, index) => ({
            ...event,
            id: maxId + index + 1,
            dateTime: event.isLocal
               ? new Date(event.dateTime + new Date(event.dateTime).getTimezoneOffset() * 60000) // Adjust for local timezone offset
               : new Date(event.dateTime)
         }));

         events = [...events, ...newEvents]; // Append events

         showModal = false;
         jsonPreview = "";

         alert("Events imported successfully!");
      } catch (error) {
         alert("Failed to import events. Please ensure the JSON is valid.");
      }
   }

   function toggleEditMode() {
      editMode = !editMode;
      if (!editMode) selectedEventIndex = null; // Reset selection when exiting edit mode
   }

   function handleFileImport(event: Event) {
       const input = event.target as HTMLInputElement;
       if (input.files && input.files[0]) {
           const file = input.files[0];
           const reader = new FileReader();

           reader.onload = () => {
               try {
                   jsonPreview = reader.result as string;
               } catch (error) {
                   alert("Invalid JSON file. Please upload a valid JSON file.");
               }
           };

           reader.readAsText(file);
       }
   }

   /**
    * Formats the target date to a countdown string in the format "DD:HH:MM:SS".
    */
   function formatToTimer(targetDate: Date): string {
      const targetTime = targetDate.getTime();
      const timeLeft = targetTime - Date.now();

      if (timeLeft < 0 && !togglePastEvents) return "Event Ended"; // Show "Event Ended" for past events in future view

      const timeDifference = Math.abs(timeLeft);
      const days     = Math.floor(timeDifference                           / (1000 * 60 * 60 * 24));
      const hours    = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes  = Math.floor((timeDifference % (1000 * 60 * 60))      / (1000 * 60));
      const seconds  = Math.floor((timeDifference % (1000 * 60))           / 1000);

      return `${days}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
   }

</script>

<main class="bg-gray-900 min-h-screen text-white">
   <div class="flex flex-col w-full max-w-4xl mx-auto p-6">
      <div class="m-4 flex gap-4">
         <button onclick={openCreateModal} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Event
         </button>
         <button onclick={toggleEditMode} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            {editMode ? "Exit Edit Mode" : "Edit Events"}
         </button>
         {#if editMode}
            <button onclick={openExportModal} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
               Export Events
            </button>
            <button onclick={openImportModal} class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
               Import Events
            </button>
         {/if}
      </div>

      <div class="m-4 flex gap-4 items-center">
         <label class="flex items-center">
            <input type="checkbox" bind:checked={enableSort} class="mr-2" />
            Sort
         </label>
         <label class="flex items-center">
            <input type="checkbox" bind:checked={togglePastEvents} class="mr-2" />
            Show Past Events
         </label>
         <input type="text" bind:value={searchQuery} placeholder="Search events..." class="bg-gray-800 text-white p-2 rounded" />
      </div>

      <!-- Dynamic Text Indicator -->
      <h2 class="text-3xl font-bold m-4">
         {togglePastEvents ? "Past Events" : "Upcoming Events"}
      </h2>

      <!-- Event List -->
      {#each eventsDisplayed as event, i}
         <div onclick={() => openEditModal(event.id)}
              class="relative w-full h-32 md:h-40 lg:h-52 flex items-center justify-center rounded-lg overflow-hidden shadow-lg transition-all duration-300 mb-2 last:mb-0 cursor-pointer"
              style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));">

            {#if event.coverImgUrl}
               <div class="absolute inset-0 bg-cover bg-center opacity-30"
                    style="background-image: url({event.coverImgUrl})">
               </div>
            {/if}

            <!-- Overlay text -->
            <div class="relative text-center text-white px-4">
               <h2 class="text-lg md:text-xl lg:text-2xl font-semibold tracking-wider">{event.name}</h2>
               <p class="text-2xl md:text-3xl lg:text-4xl font-bold mt-1">{eventCountdowns[i]}</p>
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
      {#if modalType === 0}
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
      {:else if modalType === 1}
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
      {:else if modalType === 2}
         <!-- Export -->
         <p class="mb-4">Below is the JSON representation of your events. You can copy it or save it as a file.</p>
         <textarea readonly class="w-full h-40 p-2 bg-gray-800 text-white rounded-lg mb-4">{jsonPreview}</textarea>
         <div class="flex justify-end">
            <button onclick={closeModal} class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 mr-2">
               Close
            </button>
            <button onclick={saveExportedFile} class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
               Save as File
            </button>
         </div>
      {:else if modalType === 3}
         <!-- Import -->
         <p class="mb-4">Paste or upload your JSON data below to import events. Ensure the format is correct.</p>
         <textarea bind:value={jsonPreview} class="w-full h-40 p-2 bg-gray-800 text-white rounded-lg mb-4"></textarea>
         <div class="mb-4 flex items-center gap-4">
            <label class="block text-sm font-medium text-gray-300">Upload JSON File:</label>
            <input type="file" accept=".json" onchange={handleFileImport} class="text-sm text-gray-400 bg-gray-800 rounded-lg border border-gray-600 cursor-pointer focus:outline-none" />
         </div>
         <label class="flex items-center">
            <input type="checkbox" bind:checked={replaceEventsImport} class="mr-2" />
            Replace Existing?
         </label>
         <div class="flex justify-end">
            <button onclick={closeModal} class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 mr-2">
               Cancel
            </button>
            <button onclick={importFromPreview} class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
               Import
            </button>
         </div>
      {/if}
   </Modal>

</main>
