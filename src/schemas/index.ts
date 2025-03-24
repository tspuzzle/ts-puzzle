import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
