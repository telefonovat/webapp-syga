<template>

  <div class="flex flex-col gap-2.5">

    <p
      class="text-mauve12 text-sm leading-[19px] font-semibold mb-2.5">
       Preferences
    </p>

    <fieldset class="flex gap-5 items-center">

      <label class="text-xs text-grass11 w-[75px]" for="width">
         Font size
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

  </div>

</template>

<script setup lang="ts">
  import { SwitchRoot, SwitchThumb } from "reka-ui";
  import { usePreferencesContent } from "./usePreferencesContent";
  const { fontSizePx, isCodeHighlightOn } = usePreferencesContent();
</script>

