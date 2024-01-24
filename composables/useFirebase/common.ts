import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '.'
export const getById = async (collection: string, id: string) => {
  if (!id || !collection) return
  const data = await getBy(collection, 'email', id)
  if (!!data?.length) return data[0]
  else return undefined
}

export const getBy = async <T>(col: string, field: string, value: string) => {
  if (!col || !field || !value) return undefined
  // create a reference to the collection of firestore
  const collectionRef = collection(db, col)

  // create a query against the collection
  const q = query(collectionRef, where(field, '==', value))

  // access the data of the docRef
  const docSnaps = await getDocs(q)

  if (!docSnaps.size) {
    return undefined
  } else {
    return docSnaps.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[]
  }
}
