import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { firebaseAuth } from 'utils/firebase-client'
import Auth from 'components/Auth'
import Chat from 'components/Chat'

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(firebaseAuth.currentUser)

    return onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user)
    })
  }, [])

  return user === null ? <Auth /> : <Chat key={user.uid} user={user} />
}

export default Home
