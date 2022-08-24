import Vue from 'vue'
import Vuex from 'vuex'

//Importando os modules
import contador from './../resources/contador/_store/index'
import tarefas from './../resources/tarefas/_store/index'

Vue.use(Vuex)

//Globais
const state = {
    usuario: 'Matheus'
}
const getters = {
    mensagemBoasVindas: state => `Olá ${state.usuario}`
}
const actions = {
    logar: ({ commit }, usuario) => {
        commit('logar', usuario)
    }
}
const mutations = {
    logar: (state, usuario) => {
        state.usuario = usuario
    }
}

//Estado central / nivel raiz(global)
export default new Vuex.Store({
    //vai alertar quando causar mutação diretamente no state (apenas quando estiver no modo dev)
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    mutations,
    actions,
    //Registrando os modules
    modules: {
        contador,
        tarefas
    }
})
