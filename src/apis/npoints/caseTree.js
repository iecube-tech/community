import httpInstance from "@/utils/http";
export function GetAllCaseModules() {
    return httpInstance({
        url: '/points/case_tree',
        method: 'GET',
    })
}