import httpInstance from "@/utils/http";
export function updateCaseTaskTemplate(contentId) {
    return httpInstance({
        url: '/content/update_task_template/' + contentId,
        method: 'POST',
    })
}