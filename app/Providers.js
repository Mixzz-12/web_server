"use client"

import { SessionProvider } from 'next-auth/react'
import { Children } from 'next-auth/react'

export const authproviders = ({Children}) =>{
    return<SessionProvider>{Children}</SessionProvider>
    
}


