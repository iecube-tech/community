import httpInstance from "@/utils/http";
export function GetAllCases() {
    return httpInstance({
        url: '/points/all_cases',
        method: 'GET',
    })
}