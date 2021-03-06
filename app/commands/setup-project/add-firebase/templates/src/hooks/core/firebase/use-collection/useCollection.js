import { useFirebase } from 'hooks/core/firebase/use-firebase/useFirebase'
import { useHandleError } from 'hooks/core/use-handle-error/useHandleError'


export const useCollection = (collectionName, collectionNameSingular) => {
  const { db } = useFirebase()
  const {
    handleFirebaseCreate, handleFirebaseQuery, handleFirebaseUpdate, handleFirebaseDestroy
  } = useHandleError()
  const collection = db.collection(collectionName)

  const create = async (data) => {
    try {
      const result = await collection.add(data)
      return { id: result.id, ...data}
    } catch (error) {
      handleFirebaseCreate(error, collectionName, collectionNameSingular, data)
    }
  }

  const getById = async (id) => {
    try {
      const doc = await collection.doc(id).get()

      if(doc.exists) {
        return { id, ...doc.data() }
      }

      return null
    } catch (error) {
      handleFirebaseQuery(error, collectionName, collectionNameSingular, { id })
    }
  }

  const getAll = async () => {
    try {
      const querySnapshot = await collection.get()
      const result = []
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        result.push({ id: doc.id, ...doc.data()})
      })
      return result
    } catch (error) {
      handleFirebaseQuery(error, collectionName, collectionNameSingular)
    }
  }

  const updateById = async (id, propertiesToUpdate) => {
    try {
      await collection.doc(id).update(propertiesToUpdate)
      return true
    } catch (error) {
      handleFirebaseUpdate(error, collectionName, collectionNameSingular, { id })
      return false
    }
  }

  const destroy = async (id) => {
    try {
      await collection.doc(id).delete()
      return true
    } catch (error) {
      handleFirebaseDestroy(error, collectionName, collectionNameSingular, { id })
      return false
    }
  }

  const getWhereClause = (query) => {
    if(!Array.isArray(query)) {
      // simple query
      return collection.where(query.property, query.operator, query.value)
    }

    // compound query
    let whereClauses = null

    query.forEach(q => {
      if (!whereClauses) {
        // collection.where() returns collection instance that we chain off in the else
        whereClauses = collection.where(q.property, q.operator, q.value)
      } else {
        // this is a subsequent pass through the loop, continue chaining
        whereClauses = whereClauses.where(q.property, q.operator, q.value)
      }
    })

    return whereClauses
  }

  const where = async (query) => {
    try {
      const whereClause = getWhereClause(query)
      const querySnapshot = await whereClause.get()
      const result = []
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        result.push({ id: doc.id, ...doc.data()})
      })
      return result
    } catch (error) {
      handleFirebaseQuery(error, collectionName, collectionNameSingular, { ...query })
    }
  }

  return {
    create,
    getById,
    getAll,
    updateById,
    destroy,
    where
  }
}
