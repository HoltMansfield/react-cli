import { useCollection } from 'hooks/core/firebase/use-collection/useCollection'


export const use<%= collectionNamePascalCase %> = () => {
  const <%= collectionName %> = useCollection('<%= collectionNamePascalCase %>', '<%= collectionNameSingularPascalCase %>')

  const create = async (data) => {
    return <%= collectionName %>.create(data)
  }

  const get = async (id) => {
    return <%= collectionName %>.getById(id)
  }

  const getAll = async () => {
    return <%= collectionName %>.getAll()
  }

  const update = async (id, propertiesToUpdate) => {
    return <%= collectionName %>.updateById(id, propertiesToUpdate)
  }

  const destroy = async (id) => {
    return <%= collectionName %>.destroy(id)
  }

  const findOne = async (<%= findFunctionSignature %>) => {
    const result = await <%= collectionName %>.where(<%= whereClause %>)

    if (!result || result.length === 0) {
      return null
    }

    return result[0]
  }

  return {
    create,
    get,
    getAll,
    update,
    destroy,
    findOne
  }
}
