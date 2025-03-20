'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

type LoginButtonProps = {
  children: ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}
export const LoginButton = ({ children, mode }: LoginButtonProps) => {
  const router = useRouter()
  const onClick = () => {
    router.push('/auth/login')
  }
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  )
}
