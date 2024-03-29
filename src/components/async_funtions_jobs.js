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

export async function getJobsByCompany(idCompany) {
    const response = await fetch(`${URL}/jobs?companyId=${idCompany}&_embed=company`)
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

export async function getJobById(idJob) {
    const response = await fetch(`${URL}/jobs/${idJob}`)
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

export async function createJob(job) {
    const response = await fetch(`${URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(job)
    })
    return {
        ok: response.ok,
        statusText: response.statusText
    }
}

export async function deleteJob(idJob) {
    const response = await fetch(`${URL}/jobs/${idJob}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return {
        ok: response.ok,
        statusText: response.statusText
    }
}

export async function updateJob(idJob, job) {
    const response = await fetch(`${URL}/jobs/${idJob}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(job)
    })
    return {
        ok: response.ok,
        statusText: response.statusText
    }
}