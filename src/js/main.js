import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

const URL = "http://localhost:3000"
const containerJobs = document.getElementById("container-jobs")

document.addEventListener('DOMContentLoaded', () => {
    renderJobs()
})

async function getJobs() {
    const response = await fetch(`${URL}/jobs`)
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

async function renderJobs() {
    const jobs = await getJobs()
    containerJobs.innerHTML = ""
    jobs.data.forEach(element => {
        containerJobs.innerHTML += `
        <div class="card-job">
        <h2>${element.title}</h2>
  
        <p>
        ${element.description}
        </p>
  
        <div class="row">
          <div class="col-6">
            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-current-location"></i>
              <span class="fw-semibold">${element.location}</span>
            </div>
  
            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-time"></i>
              <span class="fw-semibold">${element.publicationDate}</span>
            </div>
          </div>
  
          <div class="col-6 d-flex justify-content-end">
            <img src="img/logo.webp" alt="logo" height="80" width="80"
              class="object-fit-contain rounded-circle img-company" />
          </div>
        </div>
      </div>
        `
    })
}