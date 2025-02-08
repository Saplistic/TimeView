<script lang="ts">
   import type {oEvent} from "./types";

   export let submitEvent: (event: oEvent) => void;

   let event: oEvent = {
       name: "",
       description: "",
       dateTime: new Date()
   };

   let eventString: string = new Date().toISOString();

   function submit() {
       if (!event.name) {
           return alert("Please enter name");
       }

       event.dateTime.setTime(Date.parse(eventString));

       if (isNaN(event.dateTime.getTime())) {
           return alert("Please a valid date");
       }

       submitEvent(event);
   }

</script>

<h2 class="text-2xl font-semibold text-white mb-4">Create Event</h2>

<!-- Event creation form -->
<form on:submit|preventDefault={submit}  id="event_create">
   <div class="space-y-4 container">
      <input type="text" placeholder="Event Name" bind:value={event.name}
             class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg" />
      <textarea placeholder="Description" bind:value={event.description}
                class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg"></textarea>
      <input type="datetime-local" bind:value={eventString}
             class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg" />
   </div>
</form>