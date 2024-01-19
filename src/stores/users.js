import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {
  const user = ref(null);
  const errorMessage = ref("")

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => {}

  const handleSingup = (credentials) => {
    const {email, password, username} = credentials;

    //First validation step
    if(password.length < 6) {
      //console.log("password too short")
      return errorMessage.value = "Password must have 6 or more characters"
    }

    if(username.length < 4) {
      return errorMessage.value = "Username must have 4 or more characters"
    }

    if(!validateEmail(email)){
      return errorMessage.value = "You must provide a valid email address"
    }

    errorMessage.value = ""

  }

   

  const handleLogout = () => {}

  const getUser = () => {}

  return { user, 
    errorMessage,
      handleLogin, 
      handleSingup,
       handleLogout, 
       getUser}
})
