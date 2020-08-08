import * as lodash from 'lodash'
import fieldFormatter from './field-formatter'
import { FieldSpec, RowData, WriteOptions } from './Types'

const defaultOptions = {
  rowEnd: '',
}

const prepareToConcatData = <T>(data: RowData<T>) => (
  acc: string,
  field: FieldSpec
) => acc + fieldFormatter<T>(field, data)

const rowFormatter = <T>(
  maps: Array<FieldSpec>,
  data: RowData<T>,
  options: Partial<WriteOptions>
) => {
  if (typeof maps !== 'object') {
    throw new Error('mapping is not an array')
  }
  if (lodash.isEmpty(maps)) {
    throw new Error('mapping is empty')
  }
  if (!data) {
    throw new Error('data is null')
  }
  if (typeof data !== 'object') {
    throw new Error('data is not an object')
  }
  const opt: WriteOptions = { ...defaultOptions, ...options }
  return maps.reduce(prepareToConcatData<T>(data), '') + opt.rowEnd
}

export default rowFormatter