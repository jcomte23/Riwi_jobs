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
            alert("login exitoso")
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

async function findCompany(email) {
    const response = await fetch(`http://localhost:3000/companies?email=${email.value}`)
    if (response.ok) {
        const data = await response.json()
        return {
            ok: response.ok,
            data: data,
            statusText: response.statusText
        }
    } else {
        return {
            ok: response.ok,
            statusText: response.statusText
        }
    }
}