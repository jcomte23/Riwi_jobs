import { createJob, deleteJob, getJobById, getJobsByCompany, updateJob } from '../components/async_funtions_jobs'
import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

const tbodyJobs = document.getElementById("tbody-jobs")
const formJobs = document.getElementById("form-jobs")
const btnCloseFormJobs = document.getElementById("btn-close-form-jobs")
const titleJob = document.getElementById("title-job")
const experience = document.getElementById("experience")
const salary = document.getElementById("salary")
const location = document.getElementById("location")
const modality = document.getElementById("modality")
const description = document.getElementById("description")
const btnLogout=document.getElementById("btn-logout")
let session=JSON.parse(localStorage.getItem("userOnline"))
let idCache

document.addEventListener('DOMContentLoaded', () => {
    renderJobs()
})

formJobs.addEventListener("submit", async (event) => {
    event.preventDefault()
    const job = {
        title: titleJob.value,
        experience: experience.value,
        publicationDate: Date.now(),
        salary: salary.value,
        location: location.value,
        modality: modality.value,
        description: description.value,
        companyId: session.id,
    }
    if (idCache === undefined) {
        const jobCreated = await createJob(job)
        if (jobCreated.ok) {
            formJobs.reset()
            btnCloseFormJobs.click()
            renderJobs()
            alert("vacante creada")
        }
    } else {
        const jobUpdated = await updateJob(idCache,job)
        if (jobUpdated.ok) {
            formJobs.reset()
            btnCloseFormJobs.click()
            renderJobs()
            alert("vacante actualizada")
            idCache=undefined
        }
    }


})

tbodyJobs.addEventListener("click", async (event) => {

    if (event.target.classList.contains("delete-job")) {
        const id = event.target.getAttribute("data-id")
        const jobDeleted = await deleteJob(id)
        if (jobDeleted.ok) {
            renderJobs()
        }
    }

    if (event.target.classList.contains("edit-job")) {
        idCache = event.target.getAttribute("data-id")
        const jobFound = await getJobById(idCache)
        titleJob.value = jobFound.data.title
        experience.value = jobFound.data.experience
        salary.value = jobFound.data.salary
        location.value = jobFound.data.location
        modality.value = jobFound.data.modality
        description.value = jobFound.data.description
    }
})

btnLogout.addEventListener("click",() => {
  localStorage.setItem("userOnline","")
  localStorage.setItem("isAutorizated",JSON.stringify(false))
  window.location.href="/"
})

async function renderJobs() {
    const jobs = await getJobsByCompany(session.id)
    tbodyJobs.innerHTML = ""
    jobs.data.forEach(element => {
        tbodyJobs.innerHTML += `
        <tr>
            <td>
                <div class="d-middle">
                    <img src="${element.company.imageCompany}" alt="img-product" width="60" height="60"
                        class="img-fluid rounded-circle img-company" />
                </div>
            </td>
            <td>${element.company.nameCompany}</td>
            <td>${element.description}</td>
            <td>${element.location}</td>
            <td>${element.experience}</td>
            <td>${element.modality}</td>
            <td>${element.salary}</td>
            <td>
                <button class="btn btn-primary edit-job" data-id="${element.id}" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                    <i class="bi bi-pencil-square"></i>Edit
                </button>

                <button class="btn btn-danger delete-job" data-id="${element.id}">
                    <i class="bi bi-trash-fill"></i>Delete
                </button>
            </td>
        </tr>
        `
    })
}




