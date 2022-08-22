import type { FormEvent, ChangeEvent, TouchEvent } from 'react'
import type { User } from 'firebase/auth'
import type { Message } from 'types'
import { signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import ChatMessage from 'components/ChatMessage'
import AlwaysScrollIntoView from 'components/AlwaysScrollIntoView'
import { firebaseAuth, firebaseStore } from 'utils/firebase-client'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore'

interface ChatProps {
  user: User
}

const Chat = ({ user }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSendMessage = async (
    e: FormEvent<HTMLFormElement> | TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()

    // Handle validation here
    if (isLoading || user?.uid === null) return false

    try {
      setIsLoading(true)

      await addDoc(collection(firebaseStore, 'messages'), {
        content: message,
        uid: user.uid,
        createdAt: Timestamp.now(),
      })

      // Reset message input field
      setMessage('')
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Listen to messages updates
  useEffect(() => {
    const messageQuery = query(
      collection(firebaseStore, 'messages'),
      orderBy('createdAt')
    )

    return onSnapshot(messageQuery, (snapshot) => {
      // Get collection changes
      snapshot.docChanges().map(({ doc, type }) => {
        switch (type) {
          case 'added':
            setMessages((msgs) => [
              {
                id: doc.id,
                ...doc.data(),
              } as Message,
              ...msgs,
            ])
            break
          case 'modified':
            setMessages((msgs) =>
              msgs.map((m) =>
                m.id === doc.id
                  ? ({
                      id: doc.id,
                      ...doc.data(),
                    } as Message)
                  : m
              )
            )
            break
          case 'removed':
            setMessages((msgs) => msgs.filter((m) => m.id !== doc.id))
            break
        }
      })
    })
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-50">
      <div className="flex flex-row flex-none p-3 justify-between bg-slate-600">
        <h1 className="font-bold text-white">Chat App</h1>
        <button
          className="bg-rose-700 hover:bg-rose-600 text-white p-2 rounded"
          type="button"
          onClick={() => signOut(firebaseAuth)}
        >
          <svg
            className="w-3 h-3 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col-reverse flex-auto p-6 overflow-y-auto space-y-6 space-y-reverse min-h-[0px] text-slate-900">
        <AlwaysScrollIntoView />

        {messages.length > 0 &&
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              fromCurrentUser={msg.uid === user!.uid}
              content={msg.content ?? ''}
            />
          ))}
      </div>

      <form
        className="flex flex-row flex-none p-2 bg-slate-300 gap-x-3"
        onSubmit={handleSendMessage}
      >
        <input
          className={`flex-grow bg-white rounded p-2 focus:outline-none ${
            isLoading ? 'text-slate-600' : 'text-slate-900'
          }`}
          autoFocus
          type="text"
          value={message}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />

        <button
          className="rounded text-white px-6 bg-blue-800 hover:bg-blue-700 disabled:bg-slate-400"
          type="submit"
          disabled={isLoading || !message || !message.length}
          onTouchEnd={handleSendMessage}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default Chat
