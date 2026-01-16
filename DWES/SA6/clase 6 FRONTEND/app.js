const URL_BACKEND = "http://localhost:3010/api/v1/users"

//LOGIN
document.getElementById("loginBtn").addEventListener("click", 
    async() => {
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        const res = await fetch(URL_BACKEND + "/login", {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({username,password}),
            credentials: "include" //Recibir COOKIES del servidor
        })
        .then((res) => { return res.json()})
        .then((data) => {
            console.log(data)
        })

        //console.log(res)

})

//CARGAR USUARIOS
document.getElementById("loadUsers").addEventListener("click",
    async() => {
        const res = await fetch(URL_BACKEND, {
            credentials: "include" //Recibir COOKIES del servidor
        })
        .then((res) => { return res.json()})
        .then((data) => {
            console.log(data)
            const ul = document.getElementById("users")
            ul.innerHTML = "" //Reiniciar la lista
            for(usuario of data){
                const li = document.createElement("li")
                li.innerHTML = usuario.username + " - " + usuario.profile
                ul.appendChild(li)
            }
        })


    }
)