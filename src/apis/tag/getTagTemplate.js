import httpInstance from "@/utils/http";
export function ContentTaskTag(contentId, taskNum) {
    return httpInstance({
        url: '/tags/case_task',
        method: 'GET',
        params: { contentId: contentId, taskNum: taskNum }
    })
}