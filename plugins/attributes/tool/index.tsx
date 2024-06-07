import {Badge, Box, Card, Container, Inline, Label, Select, Stack, Text} from '@sanity/ui'
import {useMemo, useState} from 'react'
import {useMemoObservable} from 'react-rx'
import {useDocumentStore, useSchema} from 'sanity'

import {reducer, uniq} from './utils'

const AttributeTool = () => {
  const documentStore = useDocumentStore()
  const schema = useSchema()

  const [type, setType] = useState('')

  const documentTypes = schema._original?.types.filter(
    (type) => type.type === 'document' && !type.name.includes('sanity.'),
  )

  const results = useMemoObservable(() => {
    return documentStore.listenQuery(
      `*[${type && `_type == $type`}]`,
      {type},
      {perspective: 'previewDrafts'},
    )
  }, [documentStore, type])

  const reduced = useMemo(() => (results ? reducer(results, 'obj', []) : []), [results])
  const final = useMemo(() => uniq(reduced), [reduced])

  return (
    <Card padding={[0, 0, 0, 5]}>
      <Container>
        <Stack space={4}>
          <Card border padding={4}>
            <Stack space={4}>
              <Box>
                <Label size={4}>Attribute Overview</Label>
              </Box>
              <Box>
                <Text>
                  Select a document type to see an overview of the attributes that are currently on
                  that type. The <code>all</code> option will show attributes from all document
                  types.
                </Text>
              </Box>
              <Select onChange={(event) => setType(event.currentTarget.value)}>
                <option value="">All</option>
                {documentTypes &&
                  documentTypes.map((type) => (
                    <option key={type.name} value={type.name}>
                      {type.title}
                    </option>
                  ))}
              </Select>
            </Stack>
          </Card>
          {final && final.length > 0 && (
            <Card border padding={4}>
              <Stack space={4}>
                <Stack space={2}>
                  <Label size={4}>Attribute Count:</Label>
                  <Text>{final.length}</Text>
                </Stack>
                <Stack space={2}>
                  <Label size={4}>Attributes:</Label>
                  {final.map((attribute) => (
                    <Inline key={`${attribute.key}__${attribute.type}`} space={2}>
                      <Text>{attribute.key}</Text>
                      <Badge>{attribute.type}</Badge>
                    </Inline>
                  ))}
                </Stack>
              </Stack>
            </Card>
          )}
        </Stack>
      </Container>
    </Card>
  )
}

export default (config?: any) => ({
  name: 'attribute-tool',
  title: 'Attributes',
  component: AttributeTool,
  ...config,
})
