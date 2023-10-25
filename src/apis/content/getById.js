import httpInstance from "@/utils/http";
export function GetById(contenId) {
    return httpInstance({
        url: '/content/by_id',
        method: 'GET',
        params: { id: contenId }
    })
}