<script setup lang="ts">
import { Codemirror } from 'vue-codemirror';
import { python } from '@codemirror/lang-python';
import { useEditorStore } from '@/store/editor/editorStore';
import { storeToRefs } from 'pinia';
import { oneDark } from '@codemirror/theme-one-dark';
import { shallowRef } from 'vue';
import { EditorView } from 'codemirror';

import { Decoration, DecorationSet, keymap } from '@codemirror/view';
import { StateEffect, StateField } from '@codemirror/state';

const editorStore = useEditorStore();

const addUnderline = StateEffect.define<{ from: number; to: number }>(
  {
    map: ({ from, to }, change) => ({
      from: change.mapPos(from),
      to: change.mapPos(to),
    }),
  }
);

const underlineField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(underlines, tr) {
    underlines = underlines.map(tr.changes);
    for (let e of tr.effects)
      if (e.is(addUnderline)) {
        underlines = underlines.update({
          add: [underlineMark.range(e.value.from, e.value.to)],
        });
      }
    return underlines;
  },
  provide: (f) => EditorView.decorations.from(f),
});
const underlineTheme = EditorView.baseTheme({
  '.cm-underline': { backgroundColor: '#008b8b' },
});
function underlineSelection(view: EditorView) {
  let effects: StateEffect<unknown>[] = view.state.selection.ranges
    .filter((r) => !r.empty)
    .map(({ from, to }) => addUnderline.of({ from, to }));
  if (!effects.length) return false;

  if (!view.state.field(underlineField, false))
    effects.push(
      StateEffect.appendConfig.of([underlineField, underlineTheme])
    );
  view.dispatch({ effects });
  return true;
}

const underlineMark = Decoration.mark({ class: 'cm-underline' });

const { code } = storeToRefs(editorStore);
const extensions = [
  python(),
  oneDark,
  keymap.of([
    {
      key: 'Mod-h',
      preventDefault: true,
      run: underlineSelection,
    },
  ]),
];

const view = shallowRef<EditorView>();
const handleReady = (payload: { view: EditorView }) => {
  view.value = payload.view as EditorView;
};
</script>

<template>
  <div class="code-editor mock">
    <Codemirror
      v-model="code"
      :extensions="extensions"
      @ready="handleReady"
    />
  </div>
</template>

<style scoped>
.cm-editor, .code-editor{
  background-color: #282c34;
  height: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
}

.highlight-line {
  background-color: rgba(255, 255, 0, 0.2); /* Light yellow */
}
</style>
