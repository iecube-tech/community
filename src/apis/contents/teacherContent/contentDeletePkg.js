import httpInstance from "@/utils/http";
export function contentDeletePkg(contentId, pkgId) {
    return httpInstance({
        url: '/content/delete_pkg/' + contentId + '/' + pkgId,
        method: 'GET',
    })
}