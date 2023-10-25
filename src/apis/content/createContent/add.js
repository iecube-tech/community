import httpInstance from "@/utils/http";
export function Add(content) {
    return httpInstance({
        url: '/content/add',
        method: 'POST',
        data: content
    })
}