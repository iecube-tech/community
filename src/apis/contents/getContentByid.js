import httpInstance from "@/utils/http";
export function getContent(contentId) {
    return httpInstance({
        url: '/content/by_id',
        method: 'GET',
        params: { id: contentId }
    })
}