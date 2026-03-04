<template>

  <Codemirror
    v-model="codeModel"
    :extensions="extensions"
    @ready="handleReady" />

</template>

<script setup lang="ts">
  import { Codemirror } from "vue-codemirror";
  import { python } from "@codemirror/lang-python";
  import { catppuccinMocha } from "@fsegurai/codemirror-theme-bundle";
  import { shallowRef } from "vue";
  import { EditorView } from "codemirror";
  import { tags } from "@lezer/highlight";
  import {
    HighlightStyle,
    syntaxHighlighting,
  } from "@codemirror/language";
  import { Decoration, keymap } from "@codemirror/view";
  import {
    Compartment,
    StateEffect,
    StateField,
  } from "@codemirror/state";
  import { watch } from "vue";
  import { usePreferencesContent } from "../settings/preferences/usePreferencesContent";
  import { triggerNonFatalError } from "../error/useErrorHandler";
  import { formatCode } from "./formatCode";
  import { useSnackBar } from "../utility/snack/useSnackBar";

  interface Props {
    linesToHighlight: number[];
  }
  const props = defineProps<Props>();
  const codeModel = defineModel<string>("code", { required: true });

  const view = shallowRef<EditorView>();
  const handleReady = (payload: { view: EditorView }) => {
    view.value = payload.view as EditorView;
  };

  const { fontSizePx, isCodeHighlightOn } = usePreferencesContent();

  const lineHighlightMark = Decoration.line({
    attributes: { style: "background-color: var(--color-highlight)" },
  });
  const addLineHighlight = StateEffect.define<{ line: number }>();
  const clearLineHighlights = StateEffect.define<void>();
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
        } else if (e.is(clearLineHighlights)) {
          lines = Decoration.none;
          return lines;
        }
      }
      return lines;
    },
    provide: (f) => EditorView.decorations.from(f),
  });
  function highlightLines(lineNumbers: number[]) {
    if (view.value === undefined) return;
    const linesToHighlight = lineNumbers.map(
      (line) => view.value!.state.doc.line(line).from,
    );

    view.value.dispatch({
      effects: linesToHighlight.map((line) =>
        addLineHighlight.of({
          line: line,
        }),
      ),
    });
  }
  watch(isCodeHighlightOn, (newVal) => {
    if (view.value === undefined) return;
    if (!newVal) {
      view.value.dispatch({ effects: clearLineHighlights.of() });
    } else {
      highlightLines(props.linesToHighlight);
    }
  });
  watch(
    () => props.linesToHighlight,
    (newVal) => {
      if (!isCodeHighlightOn) return;
      highlightLines(newVal);
    },
  );

  const fontSizeCompartment = new Compartment();
  const getFontSizeTheme = (sizePx: number) =>
    EditorView.theme({
      ".cm-line": {
        fontSize: `${sizePx}pt`,
      },
    });
  watch(fontSizePx, (newSize) => {
    if (!view.value) return;
    view.value.dispatch({
      effects: fontSizeCompartment.reconfigure(
        getFontSizeTheme(newSize),
      ),
    });
  });

  const commentColor = "#a6e3a1";
  const customCommentStyle = HighlightStyle.define([
    { tag: tags.meta, color: commentColor },
    { tag: tags.comment, fontStyle: "italic", color: commentColor },
    {
      tag: tags.docComment,
      fontStyle: "italic",
      color: commentColor,
    },
  ]);

  // QOL features for user
  const saveKeymap = keymap.of([
    {
      key: "Ctrl-s",
      mac: "Cmd-s",
      preventDefault: true,
      run: (_view) => {
        (async () => {
          try {
            const formattedCode = await formatCode(codeModel.value);
            codeModel.value = formattedCode;

            const { triggerSnackBar } = useSnackBar();
            triggerSnackBar("Code formatted");
          } catch (e) {
            if (e instanceof Error) {
              triggerNonFatalError({ errorMessage: e.message });
            } else {
              triggerNonFatalError({
                errorMessage:
                  "An unknown error occurred while formatting",
              });
            }
          }
        })();
        return true;
      },
    },
  ]);

  // Usage in extensions
  const extensions = [
    syntaxHighlighting(customCommentStyle),
    python(),

    saveKeymap,

    lineHighlightField,
    catppuccinMocha,

    //User preferences
    fontSizeCompartment.of(getFontSizeTheme(fontSizePx.value)),
  ];
</script>

<style scoped>

</style>

<style>

</style>

