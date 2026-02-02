import React, { useState } from 'react'
import { sendRequest } from "../../utils/functions"

const Login = () => {
    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async() => {
        /*try {
            const response = await axios.post("/users/login",{
                username:username,
                password:password
            })
            console.log(response.data)            
        } catch (error) {
            console.log(error)
        }*/
        const res = await sendRequest(
            "POST",
            "/users/login",
            { username, password },
            "/usuarios"
        )

        //alert(res.message)
        /*if(res.success){
            alert("Login Correcto")
        } else {
            alert(res.message)
        }*/

    }

  return (
    <div>
        <h1>Login</h1>
        <input 
            type="text" 
            placeholder="Username..." 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)}
        />
        <input 
            type="password" 
            placeholder='Password...' 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login