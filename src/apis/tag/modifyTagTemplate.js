import httpInstance from "@/utils/http";
export function modifyTagTemplate(tagTemplate) {
    return httpInstance({
        url: '/tags/modify_tag_templates',
        method: 'POST',
        data: tagTemplate,
    })
}