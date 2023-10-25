import httpInstance from "@/utils/http";
export function GetNodesByModuleId(moduleId) {
    return httpInstance({
        url: 'points/nodes_by_module',
        method: 'GET',
        params: { moduleId: moduleId }
    })
}