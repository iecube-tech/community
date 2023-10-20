import httpInstance from "@/utils/http"

export function GetCaseAnalysis(caseId) {
    return httpInstance({
        url: '/analysis/case_analysis',
        method: 'Get',
        params: { caseId: caseId }
    })
}