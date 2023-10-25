import httpInstance from "@/utils/http";
export function GetNodesByCaseId(caseId) {
    return httpInstance({
        url: 'points/nodes_by_case',
        method: 'GET',
        params: { caseId: caseId }
    })
}