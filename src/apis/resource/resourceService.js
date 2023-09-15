import httpInstance from "@/utils/http"

const resourceService = {
    uploadImage: (file) => {
        const data = new FormData()
        data.append('file', file)
        return httpInstance.post('files/upimage', data)
    },

    uploadFiles: (file) => {
        const data = new FormData()
        data.append('file', file)
        return httpInstance({
            url: 'files/upfile',
            method: 'POST',
            params: data,
        })
    }
}

export default resourceService