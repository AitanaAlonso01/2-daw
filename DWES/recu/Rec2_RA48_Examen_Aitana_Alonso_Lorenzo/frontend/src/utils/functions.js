import axios from "axios"
import Swal from "sweetalert2";

//import { useNavigate } from "react-router-dom"

export const sendRequest = async(method, urlEndpoint, params = undefined, redir = '') => {

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


/**
 * Muestra un alert simple
 * @param {string} title
 * @param {string} text
 * @param {"success"|"error"|"info"|"warning"} icon
 */
export const showAlert = (title, text = "", icon = "info") => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "OK",
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false
  });
};

/**
 * Muestra un confirm con promesa
 * @param {string} title
 * @param {string} text
 * @param {"success"|"error"|"info"|"warning"} icon
 * @returns {Promise<boolean>} true si el usuario confirma
 */
export const showConfirm = async (title, text = "", icon = "warning") => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
    reverseButtons: true,
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-secondary'
    },
    buttonsStyling: false
  });
  return result.isConfirmed;
};