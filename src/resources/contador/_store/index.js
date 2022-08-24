//Criando módulos para separar cada state para trabalhar de forma melhor
const getters = {
    contadorAtual: state => state.contador
}

export default {
    //namespaced é para deixar o module em um escopo mais contido
    namespaced: true,
    state: { contador: 0 },
    getters
}
