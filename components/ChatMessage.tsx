interface ChatMessageProps {
  fromCurrentUser: boolean
  content: string
}

const ChatMessage = ({ fromCurrentUser, content }: ChatMessageProps) => {
  return (
    <div className={`flex flex-row w-full ${fromCurrentUser && 'justify-end'}`}>
      <div
        className={`max-w-xl break-words break-all rounded rounded-tr-none p-3 ${
          fromCurrentUser ? 'bg-blue-200' : 'bg-slate-200'
        }`}
      >
        {content}
      </div>
    </div>
  )
}

export default ChatMessage
