import httpInstance from "@/utils/http";

export function updateSolution(solution) {
    return httpInstance({
        url: 'qb/update_solution',
        method: 'POST',
        data: solution,
    })
}