import {orderBy} from 'natural-orderby'

export function reducer(item: any, key: string, array: any[]) {
  if (Array.isArray(item)) {
    array.push({
      key: key,
      type: 'array',
    })
    item.forEach((subItem) => {
      reducer(subItem, `${key}[]`, array)
    })
  } else if (typeof item === 'object') {
    array.push({
      key: key,
      type: 'object',
    })
    Object.keys(item).forEach((subItem) => {
      reducer(item[subItem], `${key}.${subItem}`, array)
    })
  } else {
    const type = typeof item
    array.push({
      key: key,
      type,
    })
  }
  return array
}

export function uniq(array: any[]) {
  // Generate set with stringified list objects and then parse to array of objects
  return orderBy(
    [...new Set(array.map((o) => JSON.stringify(o)))].map((s) => JSON.parse(s)),
    [(v) => v.key],
    ['asc'],
  )
}
