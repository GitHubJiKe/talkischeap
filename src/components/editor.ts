import { EditorState } from "@codemirror/state";

import {
    autocompletion,
    closeBrackets,
    closeBracketsKeymap,
    completionKeymap,
} from "@codemirror/autocomplete";

import {
    defaultKeymap,
    history,
    historyKeymap,
    indentWithTab,
} from "@codemirror/commands";

import {
    bracketMatching,
    defaultHighlightStyle,
    foldGutter,
    foldKeymap,
    indentOnInput,
    syntaxHighlighting,
    indentUnit,
} from "@codemirror/language";

import { lintKeymap } from "@codemirror/lint";

import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { oneDark } from "@codemirror/theme-one-dark";

import {
    crosshairCursor,
    drawSelection,
    dropCursor,
    EditorView,
    highlightActiveLine,
    highlightActiveLineGutter,
    highlightSpecialChars,
    keymap,
    lineNumbers,
    rectangularSelection,
} from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { less } from "@codemirror/lang-less";
import { sass } from "@codemirror/lang-sass";
import { vue } from "@codemirror/lang-vue";
import { markdown } from "@codemirror/lang-markdown";
import { css } from "@codemirror/lang-css";

type CodeEditorOptions = {
    code?: string;
    lang: string;
};

export function createEditor(
    el: HTMLElement,
    { code, lang }: CodeEditorOptions
) {
    let languageExtension;
    switch (lang) {
        case "javascript":
        case "typescript":
            languageExtension = javascript({
                jsx: true,
                typescript: true,
            });
            break;
        case "html":
            languageExtension = html({
                autoCloseTags: true,
                matchClosingTags: true,
                selfClosingTags: true,
            });
            break;
        case "css":
            languageExtension = css();
            break;
        case "sass":
            languageExtension = sass();
            break;
        case "less":
            languageExtension = less();
            break;
        case "json":
            languageExtension = json();
            break;
        case "markdown":
            languageExtension = markdown({
                completeHTMLTags: true,
            });
            break;
        case "vue":
            languageExtension = vue();
            break;
        default:
            languageExtension = javascript({
                jsx: true,
                typescript: true,
            });
            break;
    }

    const extensions = [
        oneDark,
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        indentUnit.of("    "),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
            ...lintKeymap,
            indentWithTab,
        ]),
        languageExtension!,
    ];
    const view = new EditorView({
        state: EditorState.create({
            doc: code,
            extensions,
        }),
        parent: el,
    });

    return { view, extensions };
}
