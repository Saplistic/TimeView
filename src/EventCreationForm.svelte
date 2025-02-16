<script lang="ts">
   import type {oEvent} from "./types";

   export let submitEvent: (event: oEvent) => void;

   let event: oEvent = {
       name: "",
       description: "",
       dateTime: new Date(),
       isLocal: false,
   };

   let eventString: string;

   function submit() {
       if (!event.name) {
           return alert("Please enter a name");
       }

       var newDate;

       if (event.isLocal)
       {
           newDate = new Date(eventString+"Z"); // Interpret time as UTC (Ignore your local timezone)
       } else {
           newDate = new Date(eventString); // Convert your local time to store as UTC
       }
       //date.toUTCString() // Displays the time in UTC
       //date.toString() // Displays the time according to your local timezone

       if (isNaN(newDate.getTime())) {
           return alert("Please enter a valid date");
       }
       event.dateTime = newDate;

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

      <label class="flex items-center space-x-2 text-white cursor-pointer">
         <input type="checkbox" bind:checked={event.isLocal}
                class="w-5 h-5 appearance-none bg-gray-800 border border-gray-600 rounded-full checked:bg-blue-500 checked:border-blue-500 focus:ring focus:ring-blue-500 transition" />
         <span class="text-gray-300">Use local time (e.g., New Year)</span>
      </label>
   </div>
</form>