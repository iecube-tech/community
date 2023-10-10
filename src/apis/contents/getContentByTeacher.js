import httpInstance from "@/utils/http";
export function getContentByTeacher(teacherId) {
    return httpInstance({
        url: '/content/get_by_t_id',
        method: 'GET',
        params: { id: teacherId }
    })
}