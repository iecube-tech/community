import httpInstance from "@/utils/http";
export function OldModules(caseId) {
    return httpInstance({
        url: '/points/modules_of_case/' + caseId,
        method: 'GET'
    })
}