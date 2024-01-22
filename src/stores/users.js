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

    //1-First validation step
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

    //2-Calls for thr auth method of supabase
    const {error} =  await supabase.auth.signUp({
      email,
      password
    })
    
    if (error){
      loading.value = false;
      return errorMessage.value = error.message
    }
    //console.log({response})

    //3- this makes a SQL Insert query on suapabse's databse with 
    // the data of the form
    await supabase.from("users").insert({
      username,
      email
    })

    //4-this makes a SQL select on the supabase databse to check for the user
    // with the same emial as registered.
    const {data: newUser} = await 
    supabase.from("users").select()
      .eq('email', email)
      .single()
    //console.log(newUser)

    // 5-Updating the user state value
    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }

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
    user,
      handleLogin, 
      handleSingup,
       handleLogout, 
       getUser,
       clearErrorMessage
      }
})
