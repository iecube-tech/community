import httpInstance from "@/utils/http";
export function AllModules() {
    return httpInstance({
        url: '/points/module_tree',
        method: 'GET'
    })
}