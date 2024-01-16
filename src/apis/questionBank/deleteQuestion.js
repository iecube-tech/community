import httpInstance from "@/utils/http";

export function deleteQuestion(id) {
    return httpInstance({
        url: 'qb/del_question',
        method: 'DELETE',
        params: { questionId: id }
    })
}