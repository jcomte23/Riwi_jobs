const URL = "http://localhost:3000"

export async function findCompany(email) {
    const response = await fetch(`${URL}/companies?email=${email.value}`)
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

export async function findCompanyNit(nit) {
    const response = await fetch(`${URL}/companies?nit=${nit.value}`)
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

export async function createCompany(company) {
    const response = await fetch("http://localhost:3000/companies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(company)
    })
    const data = await response.json()
    return {
        ok: response.ok,
        data: data,
        statusText: response.statusText
    }
}