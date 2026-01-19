<script setup lang="ts">
defineProps<{
    content?: string,
    name: string,
}>()

const images = defineModel({ required: true })
const errors = defineModel('errors', { required: false })

const emit = defineEmits(['onError'])
const input = useTemplateRef('input')
const dropZone = useTemplateRef<HTMLDivElement>('drop-zone')

function onFileInput(event: Event) {
    let inputFiles: FileList
    if (event.type == 'change') inputFiles = (event.target as HTMLInputElement).files
    if (event.type == 'drop') inputFiles = (event as DragEvent).dataTransfer.files
    if (inputFiles && inputFiles.length > 0) {
        images.value = inputFiles[0]
        if (errors) errors.value = { ...errors?.value, imagen: undefined }
    } else {
        if (errors) errors.value = { ...errors?.value, imagen: 'Imagen es requerida.' }
    }
}
function removeFile(event: Event) {
    images.value = null
}

const accept = ref<string>('.jpg,.png,.jpeg')

function openFileExplorer(e: Event) {
    if (input.value) {
        input?.value.click()
    }
}
function handleDragDropEvent(event: Event){
    event.preventDefault()
    event.stopPropagation()
    if (event.type == 'dragenter' 
        || event.type == 'dragover') (dropZone.value as HTMLDivElement).style.backgroundColor = 'gray'
    if (event.type == 'dragleave' 
        || event.type == 'drop') (dropZone.value as HTMLDivElement).style.backgroundColor = `var(--bg-color)`
}

</script>
<template>
    <div>
        <div class="drop-zone" 
            ref="drop-zone"
            @dragenter="handleDragDropEvent" 
            @dragleave="handleDragDropEvent" 
            @dragover="handleDragDropEvent" 
            @drop="(event) => {onFileInput(event); handleDragDropEvent(event)}"
        >
            <div class="top">
                <ul>
                    <li v-if="Array.isArray(images)" v-for="file in images" :key="file.name">
                        <span>{{file.name}}</span>
                        <CustomButton :content="'Borrar'" :onClick="removeFile"/>
                    </li>
                    <li v-else-if="images" :key="images.name">
                        <span>{{images.name}}</span>
                        <CustomButton :title="'Borrar'" :variant="'close'" :onClick="removeFile"/>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <CustomButton :variant="'normal'" :title="'Explorar'" @onClick="openFileExplorer"/>
                <small>Formatos aceptados: {{ accept }}</small>
                <small>Tamaño maximo: 1 Mb</small>
            </div>
        </div>
        <label :for="name"></label>
        <input 
            type="file" 
            ref="input"
            :id="name" 
            :name="name" 
            :accept="accept"
            @change="onFileInput"
        />
        <small v-if="errors?.imagen" class="errors">{{ errors?.imagen }}</small>
    </div>
</template>
<style scoped>
.drop-zone {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    border-radius: 5px;
    border: dashed 2px;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color);
    padding: 10px;
    color: var(--text-color);
    min-block-size: 150px;
    height: fit-content;
    transition: 250ms;
    margin: 2px;
    gap: 5px;
}
.drop-zone > .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50%;
}
.drop-zone > .top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 50%;
}
small.errors {
    color: #d32f2f;
}
input[type='file'] {
    display: none
}
ul {
    margin: 0;
    padding-inline-start: 10px;
}
</style>