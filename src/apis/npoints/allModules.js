import httpInstance from "@/utils/http";
export function GetAllModules() {
    return httpInstance({
        url: '/points/all_modules',
        method: 'GET',
    })
}