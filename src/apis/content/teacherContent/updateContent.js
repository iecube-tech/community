import httpInstance from "@/utils/http";
export function UpdateContent(content) {
    return httpInstance({
        url: '/content/update',
        method: 'POST',
        data: content
    })
}