<script lang="ts">
   export let show: boolean = false;

   const close = () => {
       show = false;
   }

</script>

{#if show}
   <div on:click|self={close} class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md p-6">
         <slot/>
         <div class="flex justify-end mt-6">
            <button on:click={close} class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 mr-2">Cancel</button>
            <slot name="save"/>
         </div>
      </div>
   </div>
{/if}
