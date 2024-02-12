import { createCompany, findCompany, findCompanyNit } from '../components/async_funtions_auth'
import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

const formRegister = document.getElementById("form-register")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("password-confirmation")
const company = document.getElementById("company")
const nit = document.getElementById("nit")
const imgCompany = document.getElementById("img-company")

const checkPasswords = () => {
    if (password.value.length < 6) {
        password.classList.add("is-invalid")
        return false
    }

    if (passwordConfirmation.value.length < 6) {
        passwordConfirmation.classList.add("is-invalid")
        return false
    }

    if (password.value === passwordConfirmation.value) {
        return true
    } else {
        return false
    }
}

formRegister.addEventListener("submit", async (event) => {
    event.preventDefault()
    const checkEmail = await findCompany(email)
    const checkNit = await findCompanyNit(nit)
    if (checkEmail.data.length != 0 || checkNit.data.length != 0) {
        if (checkEmail.data.length != 0) {
            email.classList.add("is-invalid")
            alert("este correo ya esta registrado")
        }
        if (checkNit.data.length != 0) {
            nit.classList.add("is-invalid")
            alert("este nit ya esta registrado")
        }
    } else {
        const validatePasswords = checkPasswords()
        if (validatePasswords) {
            const cacheCompany = {
                email: email.value,
                password: password.value,
                company: company.value,
                nit: nit.value,
                imgCompany: imgCompany.value,
            }
            const companyCreated = await createCompany(cacheCompany)
            if (companyCreated.ok) {
                formRegister.reset()
                localStorage.setItem("isAutorizated", JSON.stringify(true))
                localStorage.setItem("userOnline", JSON.stringify(companyCreated.data))
                window.location.href = "../admin/administrator.html"
            }

        } else {
            alert("valida las contraseñas")
            password.classList.add("is-invalid")
            passwordConfirmation.classList.add("is-invalid")
        }
    }
})