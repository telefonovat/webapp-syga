<template>

  <div class="flex flex-col gap-2.5">

    <p
      class="text-mauve12 text-sm leading-[19px] font-semibold mb-2.5">
       Preferences
    </p>

    <fieldset class="flex gap-5 items-center">

      <label class="text-xs text-grass11 w-[75px]" for="width">
         Editor font size
      </label>

      <input
        id="width"
        class="w-full inline-flex bg-stone-50 items-center justify-center flex-1 rounded px-2.5 text-xs leading-none text-black shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
        v-model.lazy="fontSizePx" />

    </fieldset>

    <fieldset class="flex gap-5 items-center">

      <label
        class="text-xs text-grass11 w-[75px]"
        for="code-highlight-mode">
         Code highlight on?
      </label>

      <SwitchRoot
        id="code-highlight-mode"
        v-model="isCodeHighlightOn"
        class="w-[32px] h-[20px] shadow-sm flex data-[state=unchecked]:bg-stone-500 data-[state=checked]:bg-emerald-800 border border-stone-300 data-[state=checked]:border-stone-700 dark:border-stone-700 rounded-full relative transition-[background] focus-within:outline-none focus-within:shadow-[0_0_0_1px] focus-within:border-stone-800 focus-within:shadow-stone-800">

        <SwitchThumb
          class="w-3.5 h-3.5 my-auto bg-white text-xs flex items-center justify-center shadow-xl rounded-full transition-transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-full" />

      </SwitchRoot>

    </fieldset>

    <fieldset class="flex gap-5 items-center">

      <label
        class="text-xs text-grass11 w-[75px]"
        for="code-highlight-mode">
         The text and outline of vertices is {{
          isVertexThemeWhite ? "white" : "black"
        }}
      </label>

      <SwitchRoot
        id="code-highlight-mode"
        v-model="isVertexThemeWhite"
        class="w-[32px] h-[20px] shadow-sm flex data-[state=unchecked]:bg-stone-500 data-[state=checked]:bg-emerald-800 border border-stone-300 data-[state=checked]:border-stone-700 dark:border-stone-700 rounded-full relative transition-[background] focus-within:outline-none focus-within:shadow-[0_0_0_1px] focus-within:border-stone-800 focus-within:shadow-stone-800">

        <SwitchThumb
          class="w-3.5 h-3.5 my-auto bg-white text-xs flex items-center justify-center shadow-xl rounded-full transition-transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-full" />

      </SwitchRoot>

    </fieldset>

    <fieldset class="flex gap-5 items-center">

      <label
        class="text-xs text-grass11 w-[75px]"
        for="clear-settings">
         Clear cache?
      </label>

      <DialogRoot>

        <DialogTrigger class="btn-primary pl-1">

          <Icon icon="ri:reset-left-line" />

        </DialogTrigger>

        <DialogContent
          class="bg-(--color-muted) border data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">

          <DialogTitle class="m-0 text-[17px] font-semibold">
             Clear SYGA cache?
          </DialogTitle>

          <DialogDescription
            class="mt-[10px] mb-5 text-sm leading-normal">
             Your current code will be reset to the default value.
          </DialogDescription>

          <div class="mt-[25px] flex justify-end">

            <DialogClose @click="reset" as-child>

              <button
                class="bg-green4 text-green11 text-sm hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-lg px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                 Do it
              </button>

            </DialogClose>

          </div>

        </DialogContent>

      </DialogRoot>

    </fieldset>

  </div>

</template>

<script setup lang="ts">
  import {
    SwitchRoot,
    SwitchThumb,
    DialogRoot,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
  } from "reka-ui";
  import { Icon } from "@iconify/vue";

  import { usePreferencesContent } from "./usePreferencesContent";
  import { usePersistentUserSettings } from "../usePersistentUserSettings";

  const { fontSizePx, isCodeHighlightOn, isVertexThemeWhite } =
    usePreferencesContent();
  const { reset } = usePersistentUserSettings();
</script>

