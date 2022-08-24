<template>
  <div id="app">

    <div class="jumbotron jumbotron-fluid">
      <div class="container content">
        <div class="title">
          <h1 class="display-4">Vuex</h1>
           <p class="lead">Padrão de Gerenciamento de Estado Centralizado no Vue.</p>
        </div>
      </div>
    </div>

    <div class="container">

      <div class="row">
        <div class="col-12 col-sm-9 border-right">
          <TarefasLista />
        </div>
        <div class="col-12  col-sm-3">
          <Contador />
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Contador from './resources/contador/_components/Contador.vue'
import TarefasLista from './resources/tarefas/_components/TarefasLista.vue'

export default {
    components: {
        Contador,
        TarefasLista
    }
}
</script>

<style scoped>
.jumbotron {
    padding: 0.875rem 5rem;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 6px 6px 36px 0 rgb(0 0 0 / 16%);
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 997px) {
    @media (max-width: 997px) {
        .jumbotron {
            padding: 0.875rem 5rem;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 6px 6px 36px 0 rgb(0 0 0 / 16%);
        }
        .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>
