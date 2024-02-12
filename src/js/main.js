import { getJobsByCompany } from '../components/async_funtions_jobs'
import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

const tbodyJobs = document.getElementById("tbody-jobs")

document.addEventListener('DOMContentLoaded', () => {
    renderJobs()
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