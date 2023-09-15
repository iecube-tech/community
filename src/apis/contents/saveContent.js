import httpInstance from "@/utils/http";

export function SaveContent(content) {
    return httpInstance.post('/content/add', content)
}