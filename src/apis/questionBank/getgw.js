import httpInstance from "@/utils/http";

export function getGW(pstId) {
    return httpInstance({
        url: 'qb/gw',
        method: 'GET',
        params: { pstId: pstId }
    })
}