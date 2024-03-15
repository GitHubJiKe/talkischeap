<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createEditor } from './editor';
import { EditorState } from '@codemirror/state';
import { useMessage } from 'naive-ui';

const MSG = useMessage()

const editorElRef = ref<HTMLElement>()
let editorRef: ReturnType<typeof createEditor>;

const { lang } = defineProps<{ lang: string }>()
const defaultCode = `
/**
* show me your code 
*/
`
const renderEditor = () => {
  editorRef = createEditor(editorElRef.value!, {
    code: defaultCode,
    lang: lang.split('_')[0]
  });
}

onMounted(() => {
  renderEditor()
})

const clear = () => {
  editorRef.view.setState(EditorState.create({
    extensions: editorRef.extensions,
    doc: defaultCode,
  }))

  MSG.success("cleared")
}

const copy = async () => {
  try {
    const code = editorRef.view.state.doc.toString()
    await window.navigator.clipboard.writeText(code)
    MSG.success("copied")
  } catch (error) {
    MSG.error('copy failed')
  }
}


defineExpose({
  clear,
  copy
})
</script>

<template>
  <div id="editor" ref="editorElRef"></div>
</template>

<style>
#editor {
  height: 100%;
  overflow-y: auto;
}

.cm-editor {
  min-height: 500px;
}
</style>
