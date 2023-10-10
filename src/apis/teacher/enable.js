import httpInstance from "@/utils/http";
export function TeacherEnable(teacherId) {
    return httpInstance({
        url: '/teacher/enable',
        method: 'GET',
        params: { teacherId: teacherId }
    })
}