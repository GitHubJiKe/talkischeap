<script setup lang="ts">
// Can be Edit by Others Switch
// Share <Link|Picture>
import { NSwitch, NButton, NSelect, NPopselect } from "naive-ui"
import { languages, shareWays } from './config'
import { ref, watchEffect } from "vue";

const editable = ref(true)
const shareWay = ref('link')
const lang = ref('')
const emit = defineEmits<{
    (e: 'changeLang', val: string): void
    (e: 'clear'): void
    (e: 'copy'): void
    (e: 'share'): void
    (e: 'editableChange', editable: boolean): void
}>()

watchEffect(() => {
    if (lang.value) {
        emit('changeLang', lang.value)
        lang.value = ''
    }
})

watchEffect(() => {
    emit('editableChange', editable.value)
})

watchEffect(() => {
    editable.value = shareWay.value !== 'download';
})

</script>

<template>
    <div class="px-10 py-4 flex justify-start b-1 b-green b-solid" style="gap:12px">
        <div class="flex items-center">
            <label for="lang" class="mr-4">Language:</label>
            <NSelect v-model:value="lang" :options="languages" style="width: 150px;" placeholder="Please Select">
            </NSelect>
        </div>

        <div class="flex items-center flex-1 justify-end">
            <n-button class="ml-2" type="tertiary" @click="emit('clear')">Clear</n-button>
            <n-button class="ml-2" strong secondary type="primary" @click="emit('copy')">Copy</n-button>
            <NPopselect v-model:value="shareWay" :options="shareWays">
                <n-button class="ml-2" strong secondary type="primary" @click="emit('share')">Share</n-button>
            </NPopselect>
        </div>
        <div class="flex items-center">
            <label for="editable" class="mr-4">Editable:</label>
            <NSwitch v-model:value="editable" :disabled="shareWay == 'download'">
                <template #checked>
                    True
                </template>
                <template #unchecked>
                    False
                </template>
            </NSwitch>
        </div>
    </div>
</template>