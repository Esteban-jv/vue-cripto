import { ref, onMounted, computed } from 'vue'


export default function useCripto() {

    /*const cotizarMoneda = () => {
        console.log("desde useCropt")
    }

    const exampleVar = true*/

    const criptomonedas = ref([])
    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])
    const cotizacion = ref({})
    const loading = ref(false)

    onMounted(() => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
        fetch(url)
          .then(response => response.json())
          .then( ({Data}) => criptomonedas.value =  Data)
      })

      const obtenerCotizacion = async (cotizar) => {
        cotizacion.value = {}
        loading.value = true
        try {
          const { moneda, criptomoneda } = cotizar;
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    
          const response = await fetch(url)
          const data = await response.json()
    
          cotizacion.value = data.DISPLAY[criptomoneda][moneda]
        } catch (error) {
          console.error(error)
        } finally {
          loading.value = false 
        }
      }

    // Computed
    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0
    })

    return {
        // cotizarMoneda
        // exampleVar
        monedas,
        criptomonedas,
        loading,
        cotizacion,

        obtenerCotizacion,

        mostrarResultado
    }
}