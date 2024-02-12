import { findCompany } from '../components/async_funtions_auth'
import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

const formLogin = document.getElementById("form-login")
const email = document.getElementById("email")
const password = document.getElementById("password")

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault()
    const companyFound = await findCompany(email)
    if (companyFound.data.length === 1) {
        if (companyFound.data[0].password === password.value) {
            localStorage.setItem("isAutorizated",JSON.stringify(true))
            localStorage.setItem("userOnline",JSON.stringify(companyFound.data[0]))
            window.location.href="../admin/administrator.html"
        } else {
            email.classList.add("is-valid")
            password.classList.add("is-invalid")
            alert("password incorrecta")
        }
    } else {
        email.classList.add("is-invalid")
        alert("esta compañia no esta registrada")
    }
})

