import httpInstance from "@/utils/http";
export function ContentsOfICreated() {
    return httpInstance({
        url: '/content/teacher_creat',
        method: 'GET'
    })
}