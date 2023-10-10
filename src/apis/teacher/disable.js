import httpInstance from "@/utils/http";
export function TeacherDisable(teacherId) {
    return httpInstance({
        url: '/teacher/disable',
        method: 'GET',
        params: { teacherId: teacherId }
    })
}