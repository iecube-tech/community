import httpInstance from "@/utils/http"

export function GetProjectAnalysis(projectId) {
    return httpInstance({
        url: '/analysis/project_analysis',
        method: 'Get',
        params: { projectId: projectId }
    })
}