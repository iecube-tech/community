import httpInstance from "@/utils/http";
export function updateContentDone(id) {
    return httpInstance({
        url: '/content/done/' + id,
        method: 'GET'
    })
}