'use server'

import { LoginSchema, LoginSchemaType } from '@/schemas'

export const login = async (values: LoginSchemaType) => {
  const validatedValues = LoginSchema.safeParse(values)
  if (!validatedValues.success) {
    return { error: 'Invalid form values' }
  }

  return {
    success: 'Email sent',
  }
}
