import httpInstance from "@/utils/http";
export function deleteCaseDesign(contentId, caseTargetId) {
    return httpInstance({
        url: '/design/delete/' + contentId,
        method: 'POST',
        params: { caseTargetId: caseTargetId }
    })
}