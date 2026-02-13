<template>

  <Codemirror
    v-model="codeModel"
    :extensions="extensions"
    @ready="handleReady" />

</template>

<script setup lang="ts">
  import { Codemirror } from "vue-codemirror";
  import { python } from "@codemirror/lang-python";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { computed, shallowRef } from "vue";
  import { EditorView } from "codemirror";

  import { Decoration } from "@codemirror/view";
  import {
    Compartment,
    StateEffect,
    StateField,
    EditorState,
  } from "@codemirror/state";
  import { watch } from "vue";
  import { usePreferencesContent } from "../settings/preferences/usePreferencesContent";

  interface Props {
    linesToHighlight: number[];
  }
  const props = defineProps<Props>();
  const codeModel = defineModel<string>("code", { required: true });

  const view = shallowRef<EditorView>();
  const handleReady = (payload: { view: EditorView }) => {
    view.value = payload.view as EditorView;
  };

  const lineHighlightMark = Decoration.line({
    attributes: { style: "background-color: #008b8b" },
  });
  const addLineHighlight = StateEffect.define<{ line: number }>();
  const lineHighlightField = StateField.define({
    create() {
      return Decoration.none;
    },
    update(lines, tr) {
      lines = lines.map(tr.changes);
      for (let e of tr.effects) {
        if (e.is(addLineHighlight)) {
          lines = Decoration.none;
          lines = lines.update({
            add: [lineHighlightMark.range(e.value.line)],
          });
        }
      }
      return lines;
    },
    provide: (f) => EditorView.decorations.from(f),
  });

  const { fontSizePx } = usePreferencesContent();
  const fontSizeCompartment = new Compartment();
  const getFontSizeTheme = (sizePx: number) =>
    EditorView.theme({
      "&": { fontSize: `${sizePx}pt` },
    });
  watch(fontSizePx, (newSize) => {
    if (!view.value) return;
    view.value.dispatch({
      effects: fontSizeCompartment.reconfigure(
        getFontSizeTheme(newSize),
      ),
    });
  });

  // Usage in extensions
  const extensions = [
    python(),
    oneDark,
    lineHighlightField,

    //User preferences
    fontSizeCompartment.of(getFontSizeTheme(fontSizePx.value)),
  ];

  watch(
    () => props.linesToHighlight,
    (value, _old) => {
      if (view.value === undefined) {
        return;
      }
      const linesToHighlight = value.map(
        (line) => view.value!.state.doc.line(line).from,
      );

      view.value.dispatch({
        effects: linesToHighlight.map((line) =>
          addLineHighlight.of({
            line: line,
          }),
        ),
      });
    },
  );
</script>

<style scoped>

</style>

<style>
  .cm-editor{
    @apply bg-(--color-paper);
}
</style>

