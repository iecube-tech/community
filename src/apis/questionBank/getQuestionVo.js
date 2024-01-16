import httpInstance from "@/utils/http";

export function getQuestion(pstId) {
    return httpInstance({
        url: 'qb/sq',
        method: 'GET',
        params: { pstId: pstId }
    })
}