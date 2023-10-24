import httpInstance from "@/utils/http";
export function GetPackages(contenId) {
    return httpInstance({
        url: '/content/packages',
        method: 'GET',
        params: { id: contenId }
    })
}