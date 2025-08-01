<script setup lang="ts">
  import { Codemirror } from "vue-codemirror";
  import { python } from "@codemirror/lang-python";
  import { useEditorStore } from "@/store/editor/editorStore";
  import { storeToRefs } from "pinia";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { shallowRef } from "vue";
  import { EditorView } from "codemirror";

  import { Decoration } from "@codemirror/view";
  import { StateEffect, StateField } from "@codemirror/state";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { computed } from "vue";
  import { watch } from "vue";

  const editorStore = useEditorStore();
  const visualizerStore = useVisualizerStore();

  const currentLineNos = computed(
    () => visualizerStore.currentFrame?.lineNo ?? [],
  );
  const lineHighlightMark = Decoration.line({
    attributes: { style: "background-color: #00bfffff" },
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

  // Usage in extensions
  const { code } = storeToRefs(editorStore);
  const extensions = [python(), oneDark, lineHighlightField];

  watch(currentLineNos, (value, _old) => {
    // if (view.value === undefined) {
    //   return;
    // }
    // const linesToHighlight = value.map(
    //   (line) => view.value!.state.doc.line(line).from,
    // );
    //
    // view.value.dispatch({
    //   effects: linesToHighlight.map((line) =>
    //     addLineHighlight.of({
    //       line: line,
    //     }),
    //   ),
    // });
  });

  const view = shallowRef<EditorView>();
  const handleReady = (payload: { view: EditorView }) => {
    view.value = payload.view as EditorView;
  };
</script>

<template>

  <Codemirror
    v-model="code"
    :extensions="extensions"
    @ready="handleReady" />

</template>

<style scoped>

</style>

<style>
  .cm-editor{
  flex: auto;
  max-width: 50%;
}
</style>

