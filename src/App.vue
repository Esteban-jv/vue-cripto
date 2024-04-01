<script setup>
  import { ref, reactive } from 'vue'
  import Alerta from './components/Alerta.vue'
  import Spinner from './components/Spinner.vue'
  import Cotizacion from './components/Cotizacion.vue'

  import useCripto from './composables/useCripto'

  // const { cotizarMoneda, exampleVar } = useCripto()
  // console.log(exampleVar)
  const {
    monedas,
    criptomonedas,
    loading,
    cotizacion,

    obtenerCotizacion,

    mostrarResultado
  } = useCripto()

  const error = ref('')
  // No se puede mover a useCripto por la interacción con el templates
  const cotizar = reactive({
    moneda: '',
    criptomoneda: ''
  })

  // Methods
  const cotizarCripto = () => {
    if(Object.values(cotizar).includes('')) {
      error.value= 'Todos los campos'
      return
    }
    error.value= ''
    obtenerCotizacion(cotizar)
  }
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    
    <div class="contenido">
      <Alerta
        v-if="error"
      >{{ error }}</Alerta>

      <form
        class="formulario"
        @submit.prevent="cotizarCripto"
      >
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select
            name=""
            id="moneda"
            v-model="cotizar.moneda"
        >
            <option value="">-- Selecciona --</option>
            <option 
              v-for="moneda in monedas"
              :value="moneda.codigo"
            >{{ moneda.texto }}</option>
          </select>
        </div>

        <div class="campo">
          <label for="cripto">Criptomoneda:</label>
          <select
            name=""
            id="cripto"
            v-model="cotizar.criptomoneda"
          >
            <option value="">-- Selecciona --</option>
            <option 
              v-for="cripto in criptomonedas"
              :value="cripto.CoinInfo.Name"
            >{{ cripto.CoinInfo.FullName }}</option>
          </select>
        </div>

        <input type="submit" value="Cotizar">
      </form>

      <Spinner v-if="loading" />
      <Cotizacion 
        v-if="mostrarResultado"
        :cotizacion="cotizacion"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
