import httpInstance from "@/utils/http";
export function GetGuidance(contenId) {
    return httpInstance({
        url: '/content/guidance',
        method: 'GET',
        params: { id: contenId }
    })
}