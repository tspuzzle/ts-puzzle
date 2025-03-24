'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const getUserByEmail = async (email: string) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const userResponse = await payload.find({
    collection: 'users',
    where: {
      email: { equals: email },
    },
  })

  if (userResponse.docs.length === 0) {
    return null
  }

  return userResponse.docs[0]
}

export const getUserById = async (id: number) => {
  const payload = await getPayload({
    config: configPromise,
  })

  try {
    return payload.findByID({
      collection: 'users',
      id,
    })
  } catch (error) {
    return null
  }
}
