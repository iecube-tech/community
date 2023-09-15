import httpInstance from "@/utils/http"

export function uploadFiles(file) {
    const data = new FormData()
    data.append('file', file)
    return httpInstance({
        url: 'files/upfile',
        method: 'POST',
        params: data,
    })
}