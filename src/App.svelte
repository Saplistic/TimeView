<script lang="ts">
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";
    import Modal from "./components/Modal.svelte";
    import EventCreationForm from "./EventCreationForm.svelte";
    import type { oEvent } from "./types";

    let showModal: boolean = $state(false);

    const openModal = () => {
        showModal = true;
    }

    let events = $state<oEvent[]>([
        { name: "New Year 2025", dateTime: new Date("2025-01-01T00:00:00"), description: "" },
        { name: "Summer Festival", dateTime: new Date("2025-02-21T00:00:00"), description: "" },
        { name: "Conference", dateTime: new Date("2025-03-15T09:00:00"), description: "" },
    ]);

    function addEvent(event: oEvent) {
        events.push(event);
        showModal = false;
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
            timeLeft = events.map(event => formatToTimer(event.dateTime));
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

</script>

<main class="bg-gray-900">
   <div class="flex flex-col w-full min-h-screen main p-4">
      <div class="m-4">
         <button onclick={openModal} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Event
         </button>
      </div>

      {#each events as event, i}
         <div class="relative w-full h-32 md:h-40 lg:h-52 flex items-center justify-center rounded-lg overflow-hidden shadow-lg transition-all duration-300 mb-2 last:mb-0"
              style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));">
            <!-- Background image (optional, if needed per event) -->
            <div class="absolute inset-0 bg-cover bg-center opacity-30"></div>

            <!-- Overlay text -->
            <div class="relative text-center text-white px-4">
               <h2 class="text-lg md:text-xl lg:text-2xl font-semibold tracking-wider">{event.name}</h2>
               <p class="text-2xl md:text-3xl lg:text-4xl font-bold mt-1">{timeLeft[i]}</p>
            </div>
         </div>
      {/each}
   </div>

   <Modal bind:show={showModal}>
      <EventCreationForm submitEvent={addEvent} />

      <!--Confirmation button section-->
      <button slot="confirm" form="event_create" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
         Save
      </button>
   </Modal>
</main>
