import type { RouteRecordRaw } from 'vue-router'

const modules: any = import.meta.glob('./modules/*.ts', { eager: true })

// const formatModules = (_modules: any, result: RouteRecordNormalized[]) => {
//   Object.keys(_modules).forEach((key) => {
//     const defaultModule = _modules[key].default
//     if (!defaultModule) return
//     const moduleList = Array.isArray(defaultModule)
//       ? [...defaultModule]
//       : [defaultModule]
//     result.push(...moduleList)
//   })
//   return result
// }

// const appRoutes: RouteRecordNormalized[] = formatModules(modules, [])

// export default appRoutes

const routes = Object.keys(modules).reduce((routes, key) => {
  const module = modules[key].default
  if (Array.isArray(module)) {
    return [...routes, ...module]
  } else {
    return [...routes, ...module.routes]
  }
}, [] as RouteRecordRaw[])

export default routes
