import httpInstance from "@/utils/http";

export function addSolutionToQuestion(solution) {
    return httpInstance({
        url: 'qb/add_solution',
        method: 'POST',
        data: solution,
    })
}