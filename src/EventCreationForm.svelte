<script lang="ts">
   function submit() {}

</script>

<h2 class="text-2xl font-semibold text-white mb-4">Create Event</h2>

<!-- Event creation form -->
<form on:submit|preventDefault={submit}  id="event_create">
   <div class="space-y-4 container">
      <input type="text"
             placeholder="Event Name"
             class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg" />
      <textarea placeholder="Description"
                class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg"></textarea>
      <input type="datetime-local" class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg" />
   </div>
</form>