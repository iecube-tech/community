import httpInstance from "@/utils/http";
export function schoolList() {
    return httpInstance({
        url: '/major/school_list',
        method: 'GET',
    })
}