// 创建路由实例
// 创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/login.vue'
import layout from '@/views/Layout/index.vue'
import Direction from '@/views/system/Direction/index.vue'
import User from '@/views/User/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "home",
      component: layout,
      meta: { title: '内容管理' },
      children: [
        {
          path: '',
          component: () => import('@/views/Layout/NotRefreshMain.vue'),
          children: [
            {
              path: '',
              name: "preview",
              component: () => import('@/views/content/1-preview/index.vue'),
              meta: { title: '内容预览' },
              children: [
                {
                  path: 'detail/:contentId',
                  name: "ContentDetail",
                  component: '',
                  meta: { title: '内容详情' }
                },
              ]
            },
          ]
        },
        {
          path: '/npoints',
          component: () => import('@/views/Layout/NotRefreshMain.vue'),
          children: [
            {
              path: '',
              name: "npoints",
              component: () => import('@/views/content/2-npoints/index.vue'),
              meta: { title: '知识点管理' },
              children: [
              ]
            },
          ]
        },
        {
          path: '/design',
          component: () => import('@/views/Layout/NotRefreshMain.vue'),
          children: [
            {
              path: '',
              name: "design",
              component: () => import('@/views/content/3-design/index.vue'),
              meta: { title: '教学设计' },
              children: [
              ]
            },
          ]
        },
        {
          path: 'task',
          component: () => import('@/views/Layout/RefreshMain.vue'),
          children: [
            {
              path: '',
              name: 'contentTask',
              redirect: '/task/contents',
              component: () => import('@/views/content/4-taskTemplate/index.vue'),
              meta: { title: '任务管理' },
              children: [
                {
                  path: 'contents',
                  name: 'contentList',
                  component: () => import('@/views/content/4-taskTemplate/contents/index.vue'),
                  meta: { title: '项目列表' }
                },
                {
                  path: ':contentId/list',
                  name: 'taskList',
                  component: () => import('@/views/content/4-taskTemplate/taskList/index.vue'),
                  meta: { title: '任务列表', parentName: 'contentList' }
                },
                {
                  path: ':contentId/detail/:id',
                  name: 'taskDetail',
                  component: () => import('@/views/content/4-taskTemplate/detail/index.vue'),
                  meta: { title: '任务详情', parentName: 'taskList' }
                },
                {
                  path: ':contentId/list/modify/:taskTemplateId',
                  name: 'taskModify',
                  component: () => import('@/views/content/4-taskTemplate/modify/index.vue'),
                  meta: { title: '修改任务', parentName: 'taskList' }
                },
                {
                  path: ':contentId/list/add',
                  name: 'addTaskTemplates',
                  component: () => import('@/views/content/4-taskTemplate/add/index.vue'),
                  meta: { title: '添加任务', parentName: 'taskList' }
                },
                {
                  path: ':contentId/list/tag/:num',
                  name: 'addTagTemplates',
                  component: () => import('@/views/content/4-taskTemplate/tagTemplates/index.vue'),
                  meta: { title: '任务标签', parentName: 'taskList' }
                }
              ]
            },
          ]
        },
        {
          path: 'guidance',
          component: () => import('@/views/Layout/RefreshMain.vue'),
          children: [
            {
              path: '',
              name: "guidance",
              redirect: '/guidance/contents',
              component: () => import('@/views/content/5-guidance/index.vue'),
              meta: { title: '案例指导' },
              children: [
                {
                  path: 'contents',
                  name: 'guidanceContentList',
                  component: () => import('@/views/content/5-guidance/contents/index.vue'),
                  meta: { title: '项目列表' }
                },
                {
                  path: ':contentId/guidance',
                  name: "guidancePreview",
                  component: () => import('@/views/content/5-guidance/PreviewGuidance/index.vue'),
                  meta: { title: '案例指导预览', parentName: 'guidance' }
                },
                {
                  path: ':contentId/guidance/edit',
                  name: "guidanceEdit",
                  component: () => import('@/views/content/5-guidance/EditGuidance/index.vue'),
                  meta: { title: '修改案例指导', parentName: 'guidancePreview' }
                }
              ]
            },
          ]
        },
        {
          path: '/pkg',
          component: () => import('@/views/Layout/RefreshMain.vue'),
          children: [
            {
              path: '',
              name: "pkg",
              redirect: '/pkg/contents',
              component: () => import('@/views/content/6-pkg/index.vue'),
              meta: { title: '案例资源包' },
              children: [
                {
                  path: 'contents',
                  name: 'pkgContentList',
                  component: () => import('@/views/content/6-pkg/contents/index.vue'),
                  meta: { title: '项目列表' }
                },
                {
                  path: ':contentId/pkgs',
                  name: 'editPkgs',
                  component: () => import('@/views/content/6-pkg/modify/index.vue'),
                  meta: { title: '案例资源包管理', parentName: 'pkgContentList' }
                }
              ]
            },
          ]
        },

      ]
    },
    {
      path: '/system',
      name: "system",
      component: layout,
      meta: { title: '系统管理' },
      children: [
        {
          path: '/direction',
          component: Direction,
          name: 'direction',
          meta: { title: '方向分类' }
        },
      ]
    },
    {
      path: '/user',
      name: "/user",
      component: layout,
      meta: {
        title: '用户管理'
      },
      children: [
        {
          path: '/index',
          component: User,
          meta: { title: '方向分类' }
        },
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
