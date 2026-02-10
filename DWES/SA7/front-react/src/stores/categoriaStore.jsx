import { create } from 'zustand/react'
import { sendRequest } from '../utils/functions'

const useCategoriaStore = create(set => ({
  categorias: [],
  cargarCategorias: async () => {
    const res = await sendRequest('GET', '/categorias')
    if (res.success) {
      console.log('Categorias: ' + res.data)
      set({ categorias: res.data })
    }
  },
}))

export default useCategoriaStore
