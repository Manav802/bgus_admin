import axios from "axios"

const fetch = (archived = "false") => {
    return axios.get(`http://localhost:4001/api/admin/feedback/all?archive=${archived}`)
} 

const archive = (ids, value) => {
    return axios.put(`http://localhost:4001/api/admin/feedback/delete`, {
        idCollection: ids,
        value
    })
}

export {
    fetch, archive
}