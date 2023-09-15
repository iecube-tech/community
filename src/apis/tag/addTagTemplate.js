import httpInstance from "@/utils/http";
export function addTagTemplate(tagTemplate) {
    return httpInstance({
        url: '/tags/add_tag_templates',
        method: 'POST',
        data: tagTemplate,
    })
}