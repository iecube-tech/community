import httpInstance from "@/utils/http";
export function AddConcept(data) {
    return httpInstance({
        url: '/points//add_concept',
        method: 'POST',
        data: data
    })
}