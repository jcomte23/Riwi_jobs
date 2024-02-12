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