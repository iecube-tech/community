import httpInstance from "@/utils/http";
export function updateCaseModules(contentId, modules) {
    return httpInstance({
        url: '/content/update_points/' + contentId,
        method: 'POST',
        data: modules
    })
}