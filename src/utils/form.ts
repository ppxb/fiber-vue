export const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)

// change parentProjectId to parentId to be common use
export const getTreeDataTable = (list: any) => {
  if (list) {
    let root = null
    const tempList = JSON.parse(JSON.stringify(list))
    tempList.forEach((el: any) => {
      if (!el.parentProjectId) {
        root = el
        return
      }
      const parentEl =
        tempList[
          list.reduce((acc: any, el: any, i: number) => {
            acc[el.uuid] = i
            return acc
          }, {})[el.parentProjectId]
        ]

      parentEl.children = [...(parentEl.children || []), el]
    })

    return tempList.filter((i: any) => i.level === 1)
  }
  return []
}
