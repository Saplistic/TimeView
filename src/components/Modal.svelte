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
      </div>
   </div>
{/if}
