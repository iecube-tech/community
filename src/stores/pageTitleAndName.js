import { defineStore } from 'pinia'


// 需要一个 useRoute 对象
export const pageTitleAndNameStore = defineStore((route) => {
    const title = route.matched.at(-1).meat.title
    const name = route.matched.name

    return { title, name }
})