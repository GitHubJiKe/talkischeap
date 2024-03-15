<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue';
import CodeEditor from './components/CodeEditor.vue'
import ConfigBar from './components/ConfigBar.vue'
import { NTabs, NTabPane, NMessageProvider } from 'naive-ui'

const panels = ref(['javascript']);
const activeTab = ref('javascript');
const editable = ref(true);
const handleClose = (name: string) => {
  const idx = panels.value.findIndex(v => name === (v));
  if (idx > -1 && panels.value.length > 1) {
    panels.value.splice(idx, 1)
    activeTab.value = panels.value[panels.value.length - 1]
  }
}

const getTabKey = (name: string) => `${name}_${Date.now()}`

const changeLang = (v: string) => {
  const tab = getTabKey(v)
  panels.value.push(tab)
  activeTab.value = tab;
}

const editableChange = (v: boolean) => {
  editable.value = v;
}
const instance = getCurrentInstance()
const doClear = () => {
  const refVal = (instance?.refs[`editor_${activeTab.value}`] as Array<typeof CodeEditor>)[0]
  refVal.clear()
}

const doCopy = () => {
  const refVal = (instance?.refs[`editor_${activeTab.value}`] as Array<typeof CodeEditor>)[0]
  refVal.copy()
}

</script>

<template>
  <NMessageProvider>
    <div vertical class="flex flex-col h-full" style="gap:12px">
      <ConfigBar @changeLang="changeLang" @editable-change="editableChange" @clear="doClear" @copy="doCopy" />
      <n-tabs v-model:value="activeTab" type="card" closable tab-style="min-width: 80px;" @close="handleClose">
        <n-tab-pane v-for="panel in  panels " :key="(panel)" :tab="panel" :name="panel" style="height: 80dvh;"
          display-directive="show">
          <CodeEditor :lang="panel" :ref="`editor_${panel}`" />
        </n-tab-pane>
      </n-tabs>
      <footer class="text-center text-gray">
        show me your code
      </footer>
    </div>
  </NMessageProvider>
</template>

<style scoped></style>