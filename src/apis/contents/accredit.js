import httpInstance from "@/utils/http";
export function CaseAccredit(caseAccreditQo) {
    return httpInstance({
        url: '/content/case_accredit',
        method: 'POST',
        data: caseAccreditQo,
    })
}