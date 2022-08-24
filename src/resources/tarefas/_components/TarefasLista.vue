<template>
    <div>
        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>

            <div class="col-sm-2">
                <button 
                    class="btn btn-primary float-right" 
                    @click="exibirFormularioCriarTarefa">
                        <i class="fa fa-plus mr-2"></i>
                        <span>Criar</span>
                </button>
            </div>
        </div>

        <!-- acessando os getters do store -->
             <h3 class="font-weight-light mt-4">A Fazer ({{ tarefasAFazer.length }})</h3>
        
        <ul class="list-group" v-if="tarefasAFazer.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasAFazer"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao"
                @concluir="concluirTarefa({tarefa: $event})"
                 @deletar="confirmarRemocaoDaTarefa({tarefa: $event})" />
        </ul>

        <p v-else>Nenhuma tarefa a fazer.</p>


             <h3 class="font-weight-light mt-4">Concluídas ({{ totalDeTarefasConcluidas }})</h3>
        
        <ul class="list-group" v-if="tarefasConcluidas.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasConcluidas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao"
                @concluir="concluirTarefa({tarefa: $event})"
                @deletar="confirmarRemocaoDaTarefa({tarefa: $event})" />
        </ul>

        <p v-else>Nenhuma tarefa foi concluída.</p>

        <TarefaSalvar
            v-if="exibirFormulario"
            @salvar="salvarTarefa" />

            <div class="alert alert-danger" v-if="erro">{{erro.message}}</div>


    </div>
</template>

<script>
import TarefaSalvar from './TarefaSalvar.vue'
import TarefasListaIten from './TarefasListaIten.vue'

import { createNamespacedHelpers } from 'vuex'

//Recurso para auxiliar o acesso aos namespaces
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('tarefas')

export default {
    name: 'TarefasLista',
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    data() {
        return {
            exibirFormulario: false
        }
    },
    computed: {
        //Buscando através do spread (...) e mapState a lista de tarefas que foi centralizada no store.js
        ...mapState(['tarefas', 'tarefaSelecionada', 'erro']),
        //Outra maneira de acessar os getters do store
        //o primeiro argumento é passando o namespaced setado no module do store
        ...mapGetters([
            'tarefasAFazer',
            'tarefasConcluidas',
            'totalDeTarefasConcluidas',
            'boasVindas'
        ])
    },
    created() {
        this.listarTarefas()
    },
    methods: {
        //o primeiro argumento é passando o namespaced setado no module do store
        ...mapActions([
            'listarTarefas',
            'concluirTarefa',
            'criarTarefa',
            'editarTarefa',
            'deletarTarefa',
            'selecionarTarefa',
            'resetarTarefaSelecionada'
        ]),
        exibirFormularioCriarTarefa() {
            //Se já estiver fica undefined
            if (this.tarefaSelecionada) {
                //Chamando a action para fazer todo processo
                this.resetarTarefaSelecionada()
                return
            }
            //Se não fica true
            this.exibirFormulario = !this.exibirFormulario
        },
        confirmarRemocaoDaTarefa(tarefa) {
            const confirmar = window.confirm(
                `Deseja realmente deletar a tarefa?`
            )
            if (confirmar) {
                this.deletarTarefa({ tarefa })
            }
        },

        selecionarTarefaParaEdicao(tarefa) {
            this.exibirFormulario = true
            this.selecionarTarefa({ tarefa })
        },
        async salvarTarefa(event) {
            if (event.operacao === 'criar') {
                await this.criarTarefa({ tarefa: event.tarefa })
            } else if (event.operacao === 'editar') {
                await this.editarTarefa({ tarefa: event.tarefa })
            }
            this.resetar()
        },

        resetar() {
            this.exibirFormulario = false
            this.resetarTarefaSelecionada()
        }
    }
}
</script>
