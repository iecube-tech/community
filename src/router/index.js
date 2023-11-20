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
      path: '/disable',
      name: "home",
      component: layout,
      meta: { title: '内容管理' },
      children: [
        {
          path: '',
          name: 'h',
          component: () => import('@/views/Layout/RefreshMain.vue'),
          children: [
            {
              path: '',
              name: "preview",
              component: () => import('@/views/content/1-preview/index.vue'),
              meta: { title: '内容预览' },
              children: [
                {
                  path: 'detail/:contentId',
                  name: "ContentDetail1",
                  component: '',
                  meta: { title: '内容详情' }
                },
              ]
            },
          ]
        },
        {
          path: '/npoints',
          component: () => import('@/views/Layout/RefreshMain.vue'),
          children: [
            {
              path: '',
              name: "npoints",
              redirect: '/npoints/cases',
              component: () => import('@/views/content/2-npoints/index.vue'),
              meta: { title: '知识点管理' },
              children: [
                {
                  path: 'cases',
                  name: 'npointsCaseList',
                  component: () => import('@/views/content/2-npoints/caseList/index.vue'),
                  meta: { title: '案列列表' }
                },
                {
                  path: 'cases/modules',
                  name: 'npointModuleList',
                  component: () => import('@/views/content/2-npoints/moduleList/index.vue'),
                  meta: { title: '功能模块列表', parentName: 'npointsCaseList' }
                },
                {
                  path: 'cases/modules/edit/',
                  name: 'npointModuleAdd',
                  component: () => import('@/views/content/2-npoints/moduleEdit/index.vue'),
                  meta: { title: '功能模块添加', parentName: 'npointModuleList' }
                },
                {
                  path: 'cases/modules/edit/:moduleId',
                  name: 'npointModuleEdit',
                  component: () => import('@/views/content/2-npoints/moduleEdit/index.vue'),
                  meta: { title: '功能模块编辑', parentName: 'npointModuleList' }
                },
                {
                  path: 'cases/concepts',
                  name: 'npointConcepteList',
                  component: () => import('@/views/content/2-npoints/conceptList/index.vue'),
                  meta: { title: '基础概念列表', parentName: 'npointsCaseList' }

                }
              ]
            },
          ]
        },
        {
          path: '/design',
          component: () => import('@/views/Layout/RefreshMain.vue'),
          children: [
            {
              path: '',
              name: "design",
              redirect: '/design/cases',
              component: () => import('@/views/content/3-design/index.vue'),
              meta: { title: '教学设计' },
              children: [
                {
                  path: 'cases',
                  name: 'designCaseList',
                  component: () => import('@/views/content/3-design/contents/index.vue'),
                  meta: { title: '案例列表' }
                }
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
      path: '/',
      name: "contentManage",
      component: layout,
      meta: { title: '案例设计' },
      children: [
        {
          path: '',
          component: () => import('@/views/Layout/RefreshMain.vue'),
          children: [
            {
              path: '',
              name: 'contentList',
              component: () => import('@/views/content/manage/contentList/index.vue'),
              meta: { title: '案例列表' }
            },
            {
              path: 'add',
              name: 'contentAdd',
              component: () => import('@/views/content/manage/contentModules/1-contentPreview/index.vue'),
              meta: { title: '新建案例' }
            },
            {
              path: 'check',
              name: 'contentCheck',
              redirect: '/check/list',
              component: () => import('@/views/content/manage/preview/index.vue'),
              meta: { title: '案例审核' },
              children: [
                {
                  path: 'list',
                  name: 'contentCheckList',
                  component: () => import('@/views/content/manage/contentCheckList/index.vue'),
                  meta: { title: '待审核列表' }
                },
                {
                  path: 'list/:contentId',
                  name: 'contentCheckDetail',
                  component: () => import('@/views/content/manage/preview/resourceDetail/index.vue'),
                  meta: { title: '案例详情', parentName: 'contentCheckList' },
                }
              ]
            },
            {
              path: '/modules/:contentId',
              name: 'contentModules',
              component: () => import('@/views/content/manage/contentModules/index.vue'),
              meta: { title: '案例拆解', parentName: 'contentList' },
              children: [
                {
                  path: '',
                  name: 'contentModulesList',
                  component: () => import('@/views/content/manage/contentModules/contentModulesList/index.vue'),
                  meta: { name: '案例设计' }
                },
                {
                  path: 'preview',
                  name: 'contentPreview',
                  component: () => import('@/views/content/manage/contentModules/1-contentPreview/index.vue'),
                  meta: { title: '基本信息', parentName: 'contentModulesList' }
                },
                {
                  path: 'cover',
                  name: 'contentSetCover',
                  component: () => import('@/views/content/manage/contentModules/2-contentCover/index.vue'),
                  meta: { title: '设置封面', parentName: 'contentModulesList' },
                },
                {
                  path: 'points',
                  name: 'contentPoints',
                  component: () => import('@/views/content/manage/contentModules/3-contentPoints/index.vue'),
                  meta: { title: '案例知识点', parentName: 'contentModulesList' }
                },
                {
                  path: 'design',
                  name: 'contentDesign',
                  component: () => import('@/views/content/manage/contentModules/4-contenDesign/index.vue'),
                  meta: { title: '案例教学设计', parentName: 'contentModulesList' }
                },
                {
                  path: 'tasks',
                  name: 'congtentTask',
                  component: () => import('@/views/content/manage/contentModules/5-contentTask/index.vue'),
                  meta: { title: '案例任务设计', parentName: 'contentModulesList' }
                },
                {
                  path: 'guidance',
                  name: 'contentGuidance',
                  component: () => import('@/views/content/manage/contentModules/6-contentGuidance/index.vue'),
                  meta: { title: '案例指导', parentName: 'contentModulesList' }
                },
                {
                  path: 'pkg',
                  name: 'contentPkgs',
                  component: () => import('@/views/content/manage/contentModules/7-contentPkgs/index.vue'),
                  meta: { title: '案例资源包', parentName: 'contentModulesList' }
                }
              ]
            },
          ]
        }
      ]
    },
    {
      path: '/course',
      name: 'courseManage',
      component: layout,
      meta: { title: '课程设计' },
      children: [
        {
          path: '',
          component: () => import('@/views/Layout/RefreshMain.vue'),
          children: [
            {
              path: '',
              name: 'courseList',
              component: () => import('@/views/course/manage/courseList/index.vue'),
              meta: { title: '课程列表' }
            },
            {
              path: 'add',
              name: 'courseAdd',
              component: () => import('@/views/course/manage/courseModules/1-coursePreview/index.vue'),
              meta: { title: '新建课程' }
            },
            {
              path: 'check',
              name: 'courseCheck',
              redirect: '/check/list',
              component: () => import('@/views/course/manage/preview/index.vue'),
              meta: { title: '课程审核' },
              children: [
                {
                  path: 'list',
                  name: 'coursetCheckList',
                  component: () => import('@/views/course/manage/courseCheckList/index.vue'),
                  meta: { title: '待审核列表' }
                },
                {
                  path: 'list/:contentId',
                  name: 'courseCheckDetail',
                  component: () => import('@/views/course/manage/preview/resourceDetail/index.vue'),
                  meta: { title: '课程详情', parentName: 'courseCheckList' },
                }
              ]
            },
            {
              path: '/course/modules/:contentId',
              name: 'courseModules',
              component: () => import('@/views/course/manage/courseModules/index.vue'),
              meta: { title: '课程拆解', parentName: 'courseList' },
              children: [
                {
                  path: '',
                  name: 'courseModulesList',
                  component: () => import('@/views/course/manage/courseModules/courseModulesList/index.vue'),
                  meta: { name: '课程设计' }
                },
                {
                  path: 'preview',
                  name: 'coursePreview',
                  component: () => import('@/views/course/manage/courseModules/1-coursePreview/index.vue'),
                  meta: { title: '基本信息', parentName: 'courseModulesList' }
                },
                {
                  path: 'cover',
                  name: 'courseSetCover',
                  component: () => import('@/views/course/manage/courseModules/2-courseCover/index.vue'),
                  meta: { title: '设置封面', parentName: 'courseModulesList' },
                },
                {
                  path: 'points',
                  name: 'coursePoints',
                  component: () => import('@/views/course/manage/courseModules/3-coursePoints/index.vue'),
                  meta: { title: '课程知识点', parentName: 'courseModulesList' }
                },
                {
                  path: 'design',
                  name: 'courseDesign',
                  component: () => import('@/views/course/manage/courseModules/4-courseDesign/index.vue'),
                  meta: { title: '课程教学设计', parentName: 'courseModulesList' }
                },
                {
                  path: 'tasks',
                  name: 'courseTask',
                  component: () => import('@/views/course/manage/courseModules/5-courseTask/index.vue'),
                  meta: { title: '课程任务设计', parentName: 'courseModulesList' }
                },
                {
                  path: 'guidance',
                  name: 'courseGuidance',
                  component: () => import('@/views/course/manage/courseModules/6-courseGuidance/index.vue'),
                  meta: { title: '课程指导', parentName: 'courseModulesList' }
                },
                {
                  path: 'pkg',
                  name: 'coursePkgs',
                  component: () => import('@/views/course/manage/courseModules/7-coursePkgs/index.vue'),
                  meta: { title: '课程资源', parentName: 'courseModulesList' }
                }
              ]
            },
          ]
        }
      ]
    },
    {
      path: '/client',
      name: 'client',
      redirect: '/client/school',
      component: layout,
      meta: { title: '客户管理' },
      children: [
        {
          path: '',
          component: () => import('@/views/Layout/RefreshMain.vue'),
          children: [
            {
              path: '',
              name: 'SchoolManage',
              redirect: '/client/school/list',
              component: () => import('@/views/client/schoole/index.vue'),
              meta: { title: '学校管理' },
              children: [
                {
                  path: 'school/list',
                  name: 'SchoolList',
                  component: () => import('@/views/client/schoole/schoolList/index.vue'),
                  meta: { title: '学校列表' },
                },
                {
                  path: 'school/add',
                  name: 'SchoolAdd',
                  component: () => import('@/views/client/schoole/schoolAdd/index.vue'),
                  meta: { title: '添加学校', parentName: 'SchoolList' }
                },
                {
                  path: 'school/list/:schoolID',
                  name: 'SchoolDetail',
                  component: () => import('@/views/client/schoole/schoolDetail/index.vue'),
                  meta: { title: '学校信息', parentName: 'SchoolList' },
                }
              ]
            },
            {
              path: 'teacher',
              name: 'TeacherManage',
              redirect: '/client/teacher/list',
              component: () => import('@/views/client/teacher/index.vue'),
              meta: { title: '教师管理' },
              children: [
                {
                  path: 'list',
                  name: 'TeacherList',
                  component: () => import('@/views/client/teacher/teacherList/index.vue'),
                  meta: { title: '教师列表' }
                },
                {
                  path: 'list/add',
                  name: 'TeacherAdd',
                  component: () => import('@/views/client/teacher/teacherAdd/index.vue'),
                  meta: { title: '添加教师', parentName: 'TeacherList' }
                },
                {
                  path: 'list/:teacherId/modify',
                  name: 'TeacherModify',
                  component: () => import('@/views/client/teacher/teacherModify/index.vue'),
                  meta: { title: '教师信息修改', parentName: 'TeacherList' }
                },
                {
                  path: 'list/:teacherId/accredit',
                  name: 'TeacherCaseAccredit',
                  component: () => import('@/views/client/teacher/teacherCaseAccredit/index.vue'),
                  meta: { title: '教师案例授权', parentName: 'TeacherList' }
                }

              ]
            }
          ]
        }
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
      path: '/analysis',
      name: 'DataAnalysis',
      redirect: '/analysis/case',
      component: layout,
      meta: { title: '数据管理' },
      children: [
        {
          path: '',
          component: () => import('@/views/Layout/RefreshMain.vue'),
          children: [
            {
              path: '',
              name: 'CaseDataAnalysis',
              redirect: '/analysis/case/list',
              component: () => import('@/views/analysis/CaseAnalysis/index.vue'),
              meta: { title: '案例数据' },
              children: [
                {
                  path: 'case/list',
                  name: 'CaseDataAnalysisList',
                  component: () => import('@/views/analysis/CaseAnalysis/caseList/index.vue'),
                  meta: { title: '案例列表' }
                },
                {
                  path: 'case/list/:contentId',
                  name: 'CaseDataAnalysisDetail',
                  component: () => import('@/views/analysis/CaseAnalysis/caseAnalysisDetail/index.vue'),
                  meta: { title: '案例数据', parentName: 'CaseDataAnalysisList' }
                }
              ]
            },
            {
              path: 'teacher',
              name: 'TeacherProjectAnalysis',
              redirect: '/analysis/teacher/list',
              component: () => import('@/views/analysis/TeacherAnalysis/index.vue'),
              meta: { title: '客户项目' },
              children: [
                {
                  path: 'list',
                  name: 'AnalysisTeacherList',
                  component: () => import('@/views/analysis/TeacherAnalysis/teacherList/index.vue'),
                  meta: { title: '教师列表' }
                },
                {
                  path: 'list/:teacherId',
                  name: 'AnalysisTeacherProjects',
                  component: () => import('@/views/analysis/TeacherAnalysis/teacherProjects/index.vue'),
                  meta: { title: '教师项目列表', parentName: 'AnalysisTeacherList' }
                },
                {
                  path: 'list/:teacherId/:projectId',
                  name: 'AnalysisProjectDetail',
                  component: () => import('@/views/analysis/TeacherAnalysis/projectAnalysisDetail/index.vue'),
                  meta: { title: '项目数据详情', parentName: 'AnalysisTeacherProjects' }
                }
              ]
            }
          ]

        }
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
