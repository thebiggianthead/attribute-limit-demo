/**
 * Install yargs with `npm install yargs`
 * To run: `sanity exec scripts/getAttributes.ts --with-user-token -- --dataset=production --resultFile`
 **/

import type {SanityDocument} from 'sanity'
import {getCliClient} from 'sanity/cli'
import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).argv
const client = getCliClient({
  apiVersion: '2023-02-10',
}).withConfig({
  dataset: argv.dataset || 'attribute-example',
})
/**
 * @param {}
 * query: '*'
 */
getAttributes({type: argv.type})
async function getAttributes({type = 'arrayType'} = {}) {
  const response = (await client.fetch('*[_type == $type]', {type})) as SanityDocument[]
  // eslint-disable-next-line
  // console.log([...new Set(response.map(i => i._type))])
  const reduced = reducer(response, 'obj', [])
  const final = uniq(reduced)
  // const file = argv.resultFile ? writeFile(final) : false
  // eslint-disable-next-line
  console.log(`
    ATTRIBUTES COUNTER:
    --------------------
​
    query: '* [_type == ${type}]'
    count: ${final.length}
  `)
  console.log(final.filter((i) => i.includes('title') || i.includes('body')))
}
// -------------
// UTILS
// -------------
function reducer(item: any, key: string, array: any[]) {
  if (Array.isArray(item)) {
    array.push(`${key}`)
    item.forEach((subItem) => {
      reducer(subItem, `${key}[]`, array)
    })
  } else if (typeof item === 'object') {
    array.push(`${key}`)
    Object.keys(item).forEach((subItem) => {
      reducer(item[subItem], `${key}.${subItem}`, array)
    })
  } else {
    const type = typeof item
    array.push(`${key}`)
  }
  return array
}
function uniq(array: string[]) {
  return [...new Set(array)]
}
function writeFile(array: string[]) {
  const fs = require('fs')
  const {v4: uuidGenerator} = require('uuid')
  const file = `./${uuidGenerator()}.txt`
  fs.writeFile(file, array.join('\n'), () => {})
  return file
}
