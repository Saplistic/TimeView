<script lang="ts">
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";
    import Modal from "./components/Modal.svelte";
    import EventCreationForm from "./EventCreationForm.svelte";
    import type { oEvent } from "./types";

    let showModal: boolean = false;

    const openModal = () => {
        showModal = true;
    }

    let events = [
        { name: "New Year 2025", dateTime: new Date("2025-01-01T00:00:00"), description: "" },
        { name: "Summer Festival", dateTime: new Date("2025-02-21T00:00:00"), description: "" },
        { name: "Conference", dateTime: new Date("2025-03-15T09:00:00"), description: "" },
    ];

    function addEvent(event: oEvent) {
        events.push(event);
        showModal = false;
    }

    function calculateTimeLeft(targetDate: Date): string {
        const eventTime = new Date(targetDate).getTime();
        const currentTime = new Date().getTime();

        const timeLeft = eventTime - currentTime;

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        let seconds = Math.floor((timeLeft / 1000) % 60);

        return `${days}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    let countdowns = events.map(event => ({
        ...event,
        timeLeft: calculateTimeLeft(event.date)
    }));

    let interval: number;
    onMount(() => {
        interval = setInterval(() => {
            countdowns = countdowns.map(event => ({
                ...event,
                timeLeft: calculateTimeLeft(event.date)
            }));
        }, 1000);
    });

    // Cleanup interval on component destroy
    onDestroy(() => clearInterval(interval));

</script>

<main class="bg-gray-900">
   <div class="flex flex-col w-full min-h-screen main p-4">
      <div class="m-4">
         <button onclick={openModal} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Event
         </button>
      </div>

      {#each countdowns as event}
         <div class="relative w-full h-32 md:h-40 lg:h-52 flex items-center justify-center rounded-lg overflow-hidden shadow-lg transition-all duration-300 mb-2 last:mb-0"
              style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));">
            <!-- Background image (optional, if needed per event) -->
            <div class="absolute inset-0 bg-cover bg-center opacity-30"></div>

            <!-- Overlay text -->
            <div class="relative text-center text-white px-4">
               <h2 class="text-lg md:text-xl lg:text-2xl font-semibold tracking-wider">{event.name}</h2>
               <p class="text-2xl md:text-3xl lg:text-4xl font-bold mt-1">{event.timeLeft}</p>
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
