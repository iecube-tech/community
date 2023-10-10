import httpInstance from "@/utils/http";
export function CollageListofSchools() {
    return httpInstance({
        url: '/major/school_collage',
        method: 'GET',
    })
}