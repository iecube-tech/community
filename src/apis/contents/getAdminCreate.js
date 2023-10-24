import httpInstance from "@/utils/http";
export function getAdminCreate() {
    return httpInstance({
        url: '/content/admin_create',
        method: 'GET'
    })
}