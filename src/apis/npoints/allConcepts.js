import httpInstance from "@/utils/http";
export function GetAllConcepts() {
    return httpInstance({
        url: '/points/all_concepts',
        method: 'GET',
    })
}