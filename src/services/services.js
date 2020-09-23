import axios from "axios"

const fetchServices = (archived = "false") => {
    return axios.get(`http://localhost:4001/api/admin/service/all?archive=${archived}`)
} 

const archiveServices = (ids, value) => {
    return axios.put(`http://localhost:4001/api/admin/service/delete`, {
        idCollection: ids,
        value
    })
}

export {
    fetchServices, archiveServices
}