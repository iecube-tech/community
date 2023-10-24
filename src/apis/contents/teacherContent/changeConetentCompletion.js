import httpInstance from "@/utils/http";
export function changeContentCompletion(contentId, completion) {
    return httpInstance({
        url: '/content/update_completion/' + contentId,
        method: 'POST',
        params: { completion: completion }
    })
}