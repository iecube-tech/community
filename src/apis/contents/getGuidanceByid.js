import httpInstance from "@/utils/http";
export function GetGuidance(contentId) {
    return httpInstance({
        url: '/content/guidance',
        method: 'GET',
        params: { id: contentId }
    })
}