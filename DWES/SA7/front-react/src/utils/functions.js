import axios from "axios"
//import { useNavigate } from "react-router-dom"

export const sendRequest = async(method, urlEndpoint, params = null, redir = '') => {

    //const navigate = useNavigate()

    let res = {
        success:false,
        status: null,
        data: null,
        message: ""
    }

    try {
        const response = await axios({
            method:method,
            url:urlEndpoint,
            data:params
        })

        console.log(response.data)

        //Éxito
        res.success = true
        res.status = response.status //200
        res.data = response.data
        res.message = "Operación exitosa"

        if(redir != ''){
            //navigate(redir)
            window.location.href = redir
        }

    } catch (error) {
        console.log(error)
        res.status = error.response && error.response.status ? error.response.status : 500
        res.data = error.response && error.response.data ? error.response.data : null
        res.message = error.message ? error.message : "Error del Servidor"
    }

    return res
}