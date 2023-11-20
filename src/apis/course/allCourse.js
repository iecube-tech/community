import httpInstance from "@/utils/http";
export function AllCourse() {
    return httpInstance({
        url: '/content/all_course',
        method: 'GET'
    })
}