import { createJob, getJobsByCompany } from '../components/async_funtions_jobs'
import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

const tbodyJobs = document.getElementById("tbody-jobs")
const formJobs = document.getElementById("form-jobs")
const btnCloseFormJobs=document.getElementById("btn-close-form-jobs")
const titleJob = document.getElementById("title-job")
const experience = document.getElementById("experience")
const salary = document.getElementById("salary")
const location = document.getElementById("location")
const modality = document.getElementById("modality")
const description = document.getElementById("description")

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
        companyId: "2034",
    }
    const jobCreated = await createJob(job)
    if (jobCreated.ok) {
        formJobs.reset()
        btnCloseFormJobs.click()
        renderJobs()
        alert("vacante creada")
    }
})

async function renderJobs() {
    const jobs = await getJobsByCompany("2034")
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
                <button class="btn btn-primary edit" data-id="${element.id}">
                    <i class="bx bx-edit">Edit</i>
                </button>

                <button class="btn btn-danger delete" data-id="${element.id}">
                    <i class="bx bx-trash">Delete</i>
                </button>
            </td>
        </tr>
        `
    })
}


