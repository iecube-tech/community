import httpInstance from "@/utils/http";
export function TeacherInfo(teacherId) {
    return httpInstance({
        url: '/teacher/teacher_info',
        method: 'GET',
        params: { teacherId: teacherId }
    })
}