import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../../supabase';

export const useUserStore = defineStore('users', () => {
  const user = ref(null);
  const errorMessage = ref("")
  const loading = ref(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => {}

  const handleSingup = async (credentials) => {
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

    loading.value = true

    // VALIDATE IF USER EXISTS OR NOT //
    const {data: userWithUsernameAE} = await 
    supabase.from("users").select()
      .eq('username', username)
      .single()

      if(userWithUsernameAE){
        loading.value = false;
        return errorMessage.value = "User already exists"
      }

      
    errorMessage.value = ""

    //Trying to signup on supabase
    const {error} =  await supabase.auth.signUp({
      email,
      password
    })
    
    if (error){
      loading.value = false;
      return errorMessage.value = error.message
    }
    //console.log({response})
    await supabase.from("users").insert({
      username,
      email
    })

    loading.value = false;

  }

   

  const handleLogout = () => {}

  const getUser = () => {}

  const clearErrorMessage = () => {
    errorMessage.value = ""
  }

  return { user, 
    errorMessage,
    loading,
      handleLogin, 
      handleSingup,
       handleLogout, 
       getUser,
       clearErrorMessage
      }
})