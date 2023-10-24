import httpInstance from "@/utils/http";
export function GetCaseDesigns(caseId) {
    return httpInstance({
        url: '/design/' + caseId,
        method: 'GET'
    })
}