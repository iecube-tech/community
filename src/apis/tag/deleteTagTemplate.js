import httpInstance from "@/utils/http";
export function deleteTagtemplate(id) {
    return httpInstance({
        url: '/tags/delete_tag_template',
        method: 'GET',
        params: { id: id }
    })
}