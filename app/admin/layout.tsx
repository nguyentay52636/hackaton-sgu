"use client"
import React from 'react'
import AdminPages from '@/features/admin/AdminPages'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminPages>
        {children}
      </AdminPages>
    </>
  )
}
