<template>
    <section :id="el">
    <h2>{{ titulo }}</h2>
    <form>
        <fieldset>
            <legend>Filtros</legend>
            <label for="filterTec">Aptitud:</label>
            <select id="filterTec" v-model="filterTecnologia">
                <option value="">Todas</option>
                <option v-for="tec in aptitudes" :key="tec.id" :value="tec.id">
                    {{ tec.nombre }} ({{ tec.countProyects }})
                </option>
            </select>
        </fieldset>
        <small>Mostrando {{ proyectos.length }} de {{ perfil?.proyectos.length }} Proyectos</small>
        <span class="card" @click.prevent="reset">Ver Todos</span>
    </form>
    <div :class="el">
        <p v-if="proyectos.length == 0">No hay proyectos con la Aptitud seleccionada</p>
        <article v-for="pr in proyectos" :key="pr.id" @contextmenu.prevent="">
            <span 
                class="img" 
                :style="'background-image:linear-gradient(to bottom, rgba(109, 105, 105, 0.655), rgba(109, 105, 105, 0.1)), url('+pr.imagen+');'"
            ></span>
            <h2>{{ pr.nombre }}</h2>
            <p>{{ pr.descripcion }}</p>
            <b>Tecnologias:</b>
            <div class="proyectos">
                <span 
                    v-for="tec in pr.aptitudes.slice(0,2)" 
                    :key="tec.id"
                    class="skills" 
                    @contextmenu.prevent=""
                >
                    <small>{{ tec.nombre }}</small>
                    <img :src="tec.path" :alt="tec.nombre" loading="lazy"/>
                </span>
                <span 
                    v-if="pr.aptitudes.length > 2" 
                    class="expand" 
                    @mouseenter.prevent="showAptitudes" 
                    @contextmenu.prevent=""
                >
                    <b>+{{ pr.aptitudes.length - 2 }}</b>
                </span>
                <dialog 
                    v-if="pr.aptitudes.length > 3" 
                    @mouseleave.prevent="showAptitudes" 
                    @contextmenu.prevent=""
                >
                    <span 
                        v-for="tec in pr.aptitudes" 
                        :key="tec.id"
                        class="skills"
                    >
                        <small>{{ tec.nombre }}</small>
                        <img :src="tec.path" :alt="tec.nombre" loading="lazy"/>
                    </span>
                </dialog>
            </div>
            <span class="links" @contextmenu.prevent="">
                <a 
                    v-if="pr.repositorio" 
                    :href="pr.repositorio" 
                    rel="noreferrer noopener" 
                    id="repo"
                >
                    Repositorio
                </a>
                <a 
                    v-if="pr.deploy" 
                    :href="pr.deploy" 
                    rel="noreferrer noopener" 
                    id="deploy"
                >
                Link Deploy
                </a>
            </span>
        </article>
    </div>
    </section>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { Perfil } from "../models/Perfil.js"

export default {
    name: 'Proyectos',
    props: {
        perfil: {
            type: Perfil,
            required: true,
            default: () => new Perfil(1, 'Frontend developer')
        }
    },
    setup(props) {
        const titulo = ref("Proyectos")
        const el = ref('proyectos')
        const proyectos = ref([])
        const aptitudes = ref([])
        const filterTecnologia = ref('')

        const reset = () => {
        filterTecnologia.value = ''
        proyectos.value = props.perfil.proyectos
        }

        const showAptitudes = (e) => {
            const skills = Array.from(e.target.parentNode.childNodes).filter(s => s.tagName === "DIALOG")
            if (e.type === "mouseenter") {
                skills[0].open = true
            } else if (e.type === "mouseleave") {
                skills[0].open = false
            }
        }

        // Watch for filter changes
        watch(filterTecnologia, (val) => {
            if (val !== '') {
                proyectos.value = props.perfil.proyectos
                .filter(pr => pr.aptitudes
                    .some(tec => +tec.id === +val))
            } else {
                proyectos.value = props.perfil.proyectos
            }
        })

        // Watch for perfil changes
        watch(() => props.perfil, (curr) => {
            if (curr && curr.aptitudes && curr.proyectos) {
                aptitudes.value = curr.aptitudes
                .filter(apt => curr.proyectos
                    .some(pr => pr.aptitudes
                    .some(prAp => prAp.id === apt.id)))
                .map(apt => ({
                    ...apt,
                    countProyects: curr.proyectos
                    .filter(pr => pr.aptitudes.some(prAp => prAp.id === apt.id)).length
                }))
                
                proyectos.value = curr.proyectos.slice(0, 3)
            }
        }, { immediate: true })

        onMounted(() => {
            if (props.perfil && props.perfil.aptitudes && props.perfil.proyectos) {
                aptitudes.value = props.perfil.aptitudes
                .filter(apt => props.perfil.proyectos
                    .some(pr => pr.aptitudes
                    .some(prAp => prAp.id === apt.id)))
                .map(apt => ({
                    ...apt,
                    countProyects: props.perfil.proyectos
                    .filter(pr => pr.aptitudes.some(prAp => prAp.id === apt.id)).length
                }))
                
                proyectos.value = props.perfil.proyectos.slice(0, 3)
            }
        })

        return {
            titulo,
            el,
            proyectos,
            aptitudes,
            filterTecnologia,
            reset,
            showAptitudes
        }
    }
}
</script>