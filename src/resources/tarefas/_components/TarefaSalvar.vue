<template>
    <div class="mt-4">
        <hr>
        <h2 class="font-weight-light">Salvar Tarefa</h2>

        <form @submit.prevent="salvar">
            <div class="row">
                <div :class="classeColuna">
                    <div class="form-group">
                        <label>Título</label>
                        <input 
                            type="text"
                            class="form-control" 
                            placeholder="Título da tarefa"
                           v-model="tarefa.titulo">
                    </div>
                </div>

                <div class="col-sm-2" v-if="tarefaSelecionada">
                    <div class="form-group">
                        <label>Tarefa concluída?</label>

                        <button 
                            type="button"
                            class="btn btn-sm d-block" 
                            :class="classeBotao"
                            @click="tarefa.concluido = !tarefa.concluido">
                                <i class="fa fa-check"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <button type="submit" class="btn btn-primary">Salvar</button>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'TarefasSalvar',
    data() {
        return {
            tarefa: {}
        }
    },
    computed: {
        ...mapState('tarefas', ['tarefaSelecionada']),

        classeColuna() {
            return this.tarefaSelecionada ? 'col-sm-10' : 'col-sm-12'
        },
        classeBotao() {
            return this.tarefaSelecionada && this.tarefa.concluido
                ? 'btn-success'
                : 'btn-secondary'
        }
    },
    //Serve para observar e mudar a tarefa sempre que clicarmos em outra para editar
    watch: {
        tarefaSelecionada(tarefaNova, tarefaAntiga) {
            this.sincronizar(tarefaNova)
        }
    },
    created() {
        //Na criação deste component, o methods sincronizar vai receber como parametro a tarefaSelecionada(action ta store)
        this.sincronizar(this.tarefaSelecionada)
    },
    methods: {
        salvar() {
            const operacao = !this.tarefaSelecionada ? 'criar' : 'editar'
            //Emitindo um objeto como argumento e no component pai vai ser capturado
            this.$emit('salvar', { operacao, tarefa: this.tarefa })
        },
        //Sincronizando com a tarefa selecionada para editar ou(||) criar
        sincronizar(novaTarefa) {
            this.tarefa = Object.assign(
                {},
                novaTarefa || { titulo: '', concluido: false }
            )
        }
    }
}
</script>
