'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { RegisterSchema, RegisterSchemaType } from '@/schemas'
import { getUserByEmail } from '@/data/user'

export const register = async (values: RegisterSchemaType) => {
  const validatedValues = RegisterSchema.safeParse(values)
  if (!validatedValues.success) {
    return { error: 'Invalid form values' }
  }

  const payload = await getPayload({
    config: configPromise,
  })

  const existingUser = await getUserByEmail(values.email)

  if (!existingUser) {
    return { error: 'Email already in use' }
  }

  await payload.create({
    collection: 'users',
    data: {
      email: values.email,
      password: values.password,
    },
  })

  // send verification tokem email
  return {
    success: 'User created',
  }
}
