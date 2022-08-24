import TarefasService from './_services/TarefasService'

const state = {
    tarefas: [],
    tarefaSelecionada: undefined,
    erro: undefined
}

//Faz manipulação em cima dos estados
const getters = {
    //Exemplos de como pegar os states e getters raizes(globais definidos no expor default)
    tarefasConcluidas: state => {
        return state.tarefas.filter(t => t.concluido)
    },

    tarefasAFazer: state => state.tarefas.filter(t => !t.concluido),

    totalDeTarefasConcluidas: (state, getters) =>
        getters.tarefasConcluidas.length,

    //buscando se existe o id do parametro no array de tarefas
    buscarTarefaPorId: state => id => state.tarefas.find(t => t.id === id),

    boasVindas: (state, getters, rootState, rootGetters) =>
        rootGetters.mensagemBoasVindas
}

//SEMPRE CAUSAR MUTAÇÕES NO STATE ATRAVÉS DA MUTATIONS, JAMAIS FORA / são sincronos sempre!!!!!!
const mutations = {
    listarTarefas: (state, payload) => {
        //Nome da payload setado em TarefasLista.vue
        state.tarefas = payload.tarefas
    },
    selecionarTarefa: (state, { tarefa }) => {
        state.tarefaSelecionada = tarefa
    },
    criarTarefa: (state, { tarefa }) => {
        state.tarefas.push(tarefa)
    },
    editarTarefa: (state, { tarefa }) => {
        const indice = state.tarefas.findIndex(t => t.id === tarefa.id)
        state.tarefas.splice(indice, 1, tarefa)
    },
    deletarTarefa: (state, { tarefa }) => {
        const indice = state.tarefas.findIndex(t => t.id === tarefa.id)
        state.tarefas.splice(indice, 1)
    },
    setarErro: (state, { erro }) => {
        state.erro = erro
    }
}

//elas commitam as mutations e as mutations causam mutações no state / são assincronas !!!
const actions = {
    //Action chamando outra action
    concluirTarefa: async ({ dispatch }, payload) => {
        const tarefa = Object.assign({}, payload.tarefa)
        tarefa.concluido = !tarefa.concluido
        dispatch('editarTarefa', { tarefa })
    },

    listarTarefas: async ({ commit }, payload) => {
        const response = await TarefasService.getTarefas()
        //tarefas recebe a lista de objetos que vieram como resposta da instância axios no getTarefas()
        commit('listarTarefas', { tarefas: response.data }) //tarefas/lisarTarefas
    },

    criarTarefa: ({ commit }, { tarefa }) => {
        return TarefasService.postTarefa(tarefa).then(response => {
            commit('criarTarefa', { tarefa: response.data }).catch(erro =>
                commit('setarErro', { erro })
            )
        })
    },
    editarTarefa: async ({ commit }, { tarefa }) => {
        try {
            const response = await TarefasService.putTarefa(tarefa)
            commit('editarTarefa', { tarefa: response.data })
        } catch (erro) {
            commit('setarErro', { erro })
        }
    },
    deletarTarefa: async ({ commit }, { tarefa }) => {
        const response = await TarefasService.deleteTarefa(tarefa.id)
        commit('deletarTarefa', { tarefa })
    },
    selecionarTarefa: ({ commit }, { tarefa }) => {
        commit('selecionarTarefa', { tarefa })
    },
    resetarTarefaSelecionada: ({ commit }) => {
        commit('selecionarTarefa', { tarefa: undefined })
    }
}

export default {
    //namespaced deixa em um escopo mais interno
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
