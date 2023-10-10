import httpInstance from "@/utils/http";
export function GetAllModuleConcepts() {
    return httpInstance({
        url: '/points/module_tree',
        method: 'GET',
    })
}