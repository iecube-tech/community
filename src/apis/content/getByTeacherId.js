import httpInstance from "@/utils/http";
export function GetByTeacherId() {
    return httpInstance({
        url: '/content/get_by_t_id',
        method: 'GET',
    })
}