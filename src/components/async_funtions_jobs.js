const URL = "http://localhost:3000"

export async function getJobs() {
    const response = await fetch(`${URL}/jobs?_embed=company`)
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