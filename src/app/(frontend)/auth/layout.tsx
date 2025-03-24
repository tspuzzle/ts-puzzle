import React from 'react'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <div className="flex h-full bg-gradient-to-r from-sky-400 to-blue-800 items-center justify-center">
      {children}
    </div>
  )
}
