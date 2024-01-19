import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {
  const user = ref(null);

  const handleLogin = () => {}

  const handleSingup = () => {}

  const handleLogout = () => {}

  const getUser = () => {}

  return { user, handleLogin, handleSingup, handleLogout, getUser}
})
