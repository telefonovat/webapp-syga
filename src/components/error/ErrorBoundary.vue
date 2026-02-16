<template>

  <DialogRoot v-model:open="errorOccured">

    <DialogPortal>

      <DialogOverlay
        class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />

      <DialogContent
        class="text-black data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">

        <DialogTitle
          class="text-mauve12 m-0 text-[17px] font-semibold">
           Error
        </DialogTitle>

        <DialogDescription
          class="text-mauve11 mt-[10px] mb-5 text-sm leading-normal">
           {{ errorMessage }}
        </DialogDescription>

        <div class="mt-[25px] flex justify-end">

          <DialogClose as-child>

            <button
              asChild
              @click="errorOccured = false"
              class="bg-green4 text-green11 text-sm hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-lg px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
               I understand
            </button>

          </DialogClose>

        </div>

      </DialogContent>

    </DialogPortal>

  </DialogRoot>

</template>

<script setup lang="ts">
  import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
  } from "reka-ui";

  import { useErrorHandler } from "./useErrorHandler";

  const { errorOccured, errorMessage } = useErrorHandler();
</script>

<style scoped></style>

