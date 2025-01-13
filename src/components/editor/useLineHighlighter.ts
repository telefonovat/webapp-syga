import { useVisualizerStore } from '@/store/visualizer/visualizerStore';
import { Decoration, highlightActiveLine } from '@codemirror/view';
import { EditorView } from 'codemirror';
import { computed, Ref, watch } from 'vue';

import { StateEffect, StateField } from '@codemirror/state';

export function useLineHighlighter(view: EditorView) {
  const visualizerStore = useVisualizerStore();

  const currentLineNos = computed(
    () => visualizerStore.currentFrame?.lineNo ?? []
  );
  const lineHighlightMark = Decoration.line({
    attributes: { style: 'background-color: yellow' },
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

  watch(currentLineNos, (value) => {
    if (view === undefined) {
      return;
    }
    const linesToHighlight = value.map(
      (line) => view.state.doc.line(line).from
    );

    view.dispatch({
      effects: linesToHighlight.map((line) =>
        addLineHighlight.of({
          line: line,
        })
      ),
    });
  });

  return lineHighlightField;
}
