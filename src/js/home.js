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
  getJobsByCharacters(words.value, modalityFilter.value)
})

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
              <img src="${element.company.imageCompany}" alt="logo" height="80" width="80"
                class="object-fit-contain rounded-circle img-company" />
            </div>
          </div>
        </div>
        `
  })
}

async function getJobsByCharacters(words, modality) {
  const jobs = await getJobs()
  containerJobs.innerHTML = ""
  jobs.data.forEach(element => {    
    if (element.title.includes(words) ||
      element.description.includes(words) ||
      element.location.includes(words) || (element.modality===modality)
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
                <i class="bx bx-current-location"></i>
                <span class="fw-semibold">${element.location}</span>
              </div>
    
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bx bx-time"></i>
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