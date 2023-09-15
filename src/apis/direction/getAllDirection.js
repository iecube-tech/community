import httpInstance from "@/utils/http"

export function GetAllDirection() {
    return httpInstance({
        url: '/direction/get_all',
        method: 'Get',
    })
}