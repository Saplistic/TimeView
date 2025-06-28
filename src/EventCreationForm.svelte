<script lang="ts">
   import type {oEvent} from "./types";

   export let saveEvent: (event: oEvent) => void;
   export let eventToEdit: oEvent | null = null;

   // Create a copy of the eventToEdit object to avoid direct mutation
   let event: oEvent = eventToEdit
      ? { ...eventToEdit }
      : {
         id: -1,
         name: "",
         description: "",
         dateTime: new Date(),
         isLocal: false,
         coverImgUrl: ""
      };

   let today: Date = new Date();
   today.setHours(0, 0, 0, 0);

   // Use a separate string for the datetime-local input
   let eventDateTimeString = eventToEdit
      ? convertToLocalISO(eventToEdit.dateTime)
      : convertToLocalISO(today);

   function submit() {
      if (!event.name) {
         return alert("Please enter a name");
      }

      let newDate = new Date(eventDateTimeString);

      if (isNaN(newDate.getTime())) {
         return alert("Please enter a valid date");
      }
      event.dateTime = newDate;

      saveEvent(event); // Pass the updated event to the parent component
   }

   // Helper function to format date to local ISO string for datetime-local input
   function convertToLocalISO(date: Date): string {
      // Take in date, and subtract its time offset
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return localDate.toISOString().slice(0, 16);
   }

</script>

<h2 class="text-2xl font-semibold text-white mb-4">{eventToEdit ? "Edit Event" : "Create Event"}</h2>

<!-- Event creation form -->
<form on:submit|preventDefault={submit} id="event_create">
   <div class="space-y-4 container">
      <input type="text" placeholder="Event Name" bind:value={event.name}
             class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg" />

      <textarea placeholder="Description" bind:value={event.description}
                class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg max-h-48"></textarea>

      <input type="datetime-local" bind:value={eventDateTimeString}
             class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg" />

      <label class="flex items-center space-x-2 text-white cursor-pointer">
         <input type="checkbox" bind:checked={event.isLocal}
                class="w-5 h-5 appearance-none bg-gray-800 border border-gray-600 rounded-full checked:bg-blue-500 checked:border-blue-500 focus:ring focus:ring-blue-500 transition" />
         <span class="text-gray-300">Mark date as local (updates to users timezone)</span>
      </label>

      <input type="text" placeholder="Cover Image URL" bind:value={event.coverImgUrl}
             class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg" />
   </div>
</form>