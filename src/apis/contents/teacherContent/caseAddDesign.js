import httpInstance from "@/utils/http";
export function caseAddDesign(caseId, design) {
    return httpInstance({
        url: '/design/add_design/' + caseId,
        method: 'POST',
        data: design
    })
}