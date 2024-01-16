import httpInstance from "@/utils/http";

export function updateWeighting(pstId, weighting) {
    return httpInstance({
        url: 'qb/ogw',
        method: 'POST',
        params: { pstId: pstId, weighting: weighting }
    })
}