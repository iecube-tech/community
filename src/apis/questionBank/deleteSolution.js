import httpInstance from "@/utils/http";

export function deleteSolution(id) {
    return httpInstance({
        url: 'qb/del_solution',
        method: 'DELETE',
        params: { solutionId: id }
    })
}