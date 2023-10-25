import httpInstance from "@/utils/http";
export function ContentTasks(contentId) {
    return httpInstance({
        url: '/content/tasks',
        method: 'GET',
        params: { contentId: contentId }
    })
}