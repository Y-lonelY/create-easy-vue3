<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue'
import { ref, toRaw, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'

// 获取所有路由
const router = useRouter()
const routes = router.options.routes

const handleRoutes: any = (data: any) => {
  if (!data || data.length === 0) return []
  const crt = []
  for (let item of data) {
    if (item.children) {
      if (item.meta && item.meta.title) {
        const crtItem = {
          ...item,
          children: handleRoutes(item.children),
        }
        crt.push(crtItem)
      } else {
        const list = handleRoutes(item.children)
        crt.push(...list)
      }
    } else {
      if (item.meta && item.meta.title) {
        crt.push(item)
      }
    }
  }
  return crt
}
/**
 * 构建侧边栏渲染数据，执行过滤逻辑
 * - 默认过滤掉没有 meta.title 的 route
 */
const renderRoutes = handleRoutes(routes)

// 获取当前路由
const route = useRoute()
const currentRoute = ref(toRaw(toRaw(route).matched))
const selectedKeys = ref<string[]>([])
const openedKeys = ref<string[]>(['/home/overview', '/home/p1'])

watch(
  () => route.path,
  () => {
    setCurrentSelectedRoute()
  },
)

// 切换路由
const handleRouteClick = ({ item, key, keyPath }: any) => {
  router.push(key)
}

// 设置当前选中路由
const setCurrentSelectedRoute = () => {
  const len = currentRoute.value.length
  if (len > 0) {
    selectedKeys.value = currentRoute.value.slice(-1).map(item => item.path)
  }
  if (len > 2) {
    openedKeys.value = currentRoute.value.slice(1,-1).map(item => item.path)
  }
}

onMounted(() => {
  setCurrentSelectedRoute()
})
</script>

<template>
  <a-layout-sider>
    <a-menu
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
      :selectedKeys="selectedKeys"
      :openKeys="openedKeys"
      @click="handleRouteClick"
    >
      <template v-for="(r1, i) in renderRoutes" :key="i">
        <a-menu-item v-if="!r1.children || r1.children.length === 0" :key="r1.path">{{
          r1.meta?.title
        }}</a-menu-item>
        <template v-else>
          <a-sub-menu :key="r1.path">
            <template #title>
              <span>
                {{ r1.meta?.title }}
              </span>
            </template>
            <template v-for="r2 in r1.children" :key="`2-${i}`">
              <a-menu-item v-if="!r2.children || r2.children?.length === 0" :key="r2.path">{{
                r2.meta?.title
              }}</a-menu-item>
              <template v-else>
                <a-sub-menu :key="r2.path">
                  <template #title>
                    <span>
                      {{ r2.meta?.title }}
                    </span>
                  </template>
                  <template v-for="r3 in r2.children" :key="`3-${i}`">
                    <a-menu-item v-if="!r3.children || r3.children?.length === 0" :key="r3.path">{{
                      r3.meta?.title
                    }}</a-menu-item>
                  </template>
                </a-sub-menu>
              </template>
            </template>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
