import httpInstance from "@/utils/http";
export function contentTaskTemplates(contentId) {
    return httpInstance({
        url: '/task_template',
        method: 'GET',
        params: { contentId: contentId }
    })
}