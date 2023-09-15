import httpInstance from "@/utils/http"

export function uploadImages(file) {
    const data = new FormData()
    data.append('file', file)
    return httpInstance({
        url: 'files/upimage',
        method: 'POST',
        params: data,
    })
}