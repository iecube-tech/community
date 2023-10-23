import httpInstance from "@/utils/http";
export function teacherProject(teacherId) {
    return httpInstance({
        url: '/project/teacher_project',
        method: 'GET',
        params: { teacherId: teacherId }
    })
}