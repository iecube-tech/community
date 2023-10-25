import httpInstance from "@/utils/http";
export function GetNodesByConceptId(conceptId) {
    return httpInstance({
        url: 'points/nodes_by_concept',
        method: 'GET',
        params: { conceptId: conceptId }
    })
}