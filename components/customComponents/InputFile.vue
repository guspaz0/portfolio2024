<script setup lang="ts">
import CustomButton from './CustomButton.vue';
defineProps<{
    errors?: Record<string, any>,
    content?: string,
    name: string,
}>()

const images = defineModel({ required: true })
const inputRef = ref()

const emit = defineEmits(['onError'])

function onFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        images.value = target.files[0]
        emit('onError', { imagen: undefined })
    } else {
        emit('onError', { imagen: 'Imagen es requerida.' })
    }
}
function removeFile(event: Event) {
    images.value = null
}

const accept = ref<string>('.jpg,.png,.jpeg')

function openFileExplorer(e: Event) {
    const input = document.querySelector(`input[type='file']`)
    input?.click()
}

</script>
<template>
    <div>
        <div class="drop-zone">
            <div>
                <ul>
                    <li v-for="file in imagen" :key="file.name">
                        <span>{{file.name}}</span>
                        <CustomButton :content="'Borrar'" :onClick="removeFile"/>
                    </li>
                </ul>
            </div>
            <div>
                <CustomButton :title="'Explorar'" @onClick="openFileExplorer"/>
                <p>Formatos aceptados: {{ accept }}</p>
                <p>Tamaño maximo: 1 Mb</p>
            </div>
        </div>
        <label :for="name"></label>
        <input 
            type="file" 
            :id="name" 
            :name="name" 
            :accept="accept" 
            :style="{ display: 'none' }" 
            :change="onFileInput"
            :ref="inputRef"
        />
        <small v-if="errors?.imagen" class="errors">{{ errors?.imagen }}</small>
    </div>
</template>
<style scoped>
.drop-zone {
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 5px;
    border: dashed 2px;
    align-items: center;
    justify-content: center;
    background-color: var(--navbar-bg);
    padding: 10px;
    color: var(--text-color);
    min-block-size: 230px;
    height: fit-content;
    width: fit-content;
    transition: 250ms;
}
small.errors {
    color: red;
}
</style>