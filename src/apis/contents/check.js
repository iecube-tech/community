import httpInstance from "@/utils/http";
export function Check(contentId) {
    return httpInstance({
        url: '/content/check',
        method: 'GET',
        params: { contentId: contentId }
    })
}