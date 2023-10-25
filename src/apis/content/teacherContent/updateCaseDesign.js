import httpInstance from "@/utils/http";
export function updateCaseDesigns(contentId) {
    return httpInstance({
        url: '/content/update_design/' + contentId,
        method: 'POST',
    })
}