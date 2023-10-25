import httpInstance from "@/utils/http";
export function UpdateGuidance(contentId, data) {
    return httpInstance({
        url: '/content/update_guidance/' + contentId,
        method: 'POST',
        data: data
    })
}