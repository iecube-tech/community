import httpInstance from "@/utils/http";

export function getDirection() {
    return httpInstance({
        url: 'direction/get_all'
    })
}