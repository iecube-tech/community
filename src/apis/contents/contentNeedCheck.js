import httpInstance from "@/utils/http";
export function NeedCheck() {
    return httpInstance({
        url: '/content/need_check',
        method: 'GET'
    })
}