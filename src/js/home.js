import { getJobs } from '../components/async_funtions_jobs'
import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

const containerJobs = document.getElementById("container-jobs")
const formSearchJob = document.getElementById("form-search-job")
const words = document.getElementById("words")
const modalityFilter = document.getElementById("modality-filter")

document.addEventListener('DOMContentLoaded', () => {
  renderJobs()
})

formSearchJob.addEventListener("submit", (event) => {
  event.preventDefault()
  if (words.value === "" && modalityFilter.value === "") {
    renderJobs()
  } else {
    getJobsByCharacters(words.value, modalityFilter.value)
  }

})

async function renderJobs() {
  containerJobs.innerHTML = ""
  const jobs = await getJobs()
  if (jobs.data.length === 0) {
    containerJobs.innerHTML += `
    <div class="card-job">
      <p class="w-100 text-center">No hay ofertas disponibles</p>
    </div>
    `
  } else {
    jobs.data.forEach(element => {
      containerJobs.innerHTML += `
        <div class="card-job">
          <h2>${element.title}</h2>
    
          <p>${element.description}</p>
    
          <div class="row">
            <div class="col-6">
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bi bi-person-lines-fill"></i>
                <span class="fw-semibold">${element.experience} years of experience</span>
              </div>
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <span class="fw-semibold">${Number(element.salary).toLocaleString("en-US", { currency: "USD", style: "currency", minimumFractionDigits: 0 })}</span>
              </div>
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bi bi-geo-alt-fill"></i>
                <span class="fw-semibold">${element.location} , ${element.modality}</span>
              </div>
    
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bi bi-calendar3">Publication Date:</i>
                <span class="fw-semibold">${element.publicationDate}</span>
              </div>

              
            </div>
    
            <div class="col-6 d-flex justify-content-end">
              <img src="${element.company.imageCompany}" alt="logo" height="80" width="80"
                class="object-fit-contain rounded-circle img-company" />
            </div>
          </div>
        </div>
        `
    })
  }
}

async function getJobsByCharacters(words, modality) {
  console.log("words", words);
  console.log("modality", modality);
  const jobs = await getJobs()
  containerJobs.innerHTML = ""
  jobs.data.forEach(element => {
    if (
      element.title.includes(words) ||
      element.description.includes(words) ||
      element.location.includes(words)
    ) {
      containerJobs.innerHTML += `
        <div class="card-job">
          <h2>${element.title}</h2>
    
          <p>
          ${element.description}
          </p>
    
          <div class="row">
            <div class="col-6">
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bi bi-person-lines-fill"></i>
                <span class="fw-semibold">${element.experience} years of experience</span>
              </div>
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <span class="fw-semibold">${Number(element.salary).toLocaleString("en-US", { currency: "USD", style: "currency", minimumFractionDigits: 0 })}</span>
              </div>
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bi bi-geo-alt-fill"></i>
                <span class="fw-semibold">${element.location} , ${element.modality}</span>
              </div>
    
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bi bi-calendar3">Publication Date:</i>
                <span class="fw-semibold">${element.publicationDate}</span>
              </div>

              
            </div>
    
            <div class="col-6 d-flex justify-content-end">
              <img src="${element.company.imageCompany}" alt="logo" height="80" width="80"
                class="object-fit-contain rounded-circle img-company" />
            </div>
          </div>
        </div>
        `
    }

    if (element.modality === modality) {
      containerJobs.innerHTML += `
        <div class="card-job">
          <h2>${element.title}</h2>
    
          <p>
          ${element.description}
          </p>
    
          <div class="row">
            <div class="col-6">
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bi bi-person-lines-fill"></i>
                <span class="fw-semibold">${element.experience} years of experience</span>
              </div>
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <span class="fw-semibold">${Number(element.salary).toLocaleString("en-US", { currency: "USD", style: "currency", minimumFractionDigits: 0 })}</span>
              </div>
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bi bi-geo-alt-fill"></i>
                <span class="fw-semibold">${element.location}</span>
              </div>
    
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bi bi-calendar3">Publication Date:</i>
                <span class="fw-semibold">${element.publicationDate}</span>
              </div>

              
            </div>
    
            <div class="col-6 d-flex justify-content-end">
              <img src="${element.company.imageCompany}" alt="logo" height="80" width="80"
                class="object-fit-contain rounded-circle img-company" />
            </div>
          </div>
        </div>
        `
    }

  })

}