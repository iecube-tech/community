import httpInstance from "@/utils/http";
export function teacherList() {
    return httpInstance({
        url: '/teacher/teacher_list',
        method: 'GET',
    })
}