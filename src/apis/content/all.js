import httpInstance from "@/utils/http";
export function All() {
    return httpInstance({
        url: '/content/all',
        method: 'GET'
    })
}