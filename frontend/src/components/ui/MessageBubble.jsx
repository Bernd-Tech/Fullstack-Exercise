export const MessageBubble = ({ message, isUser = "user", timestamp}) => {
    const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex ${isUser === "user" ? 'justify-end' : 'justify-start'} mb-8 animate-fade-in`}>
      <div className={`flex items-start max-w-[70%] ${isUser === "user" ? 'flex-row-reverse' : 'flex-row'}`}>

        {/* Message Content */}
        <div className={`flex flex-col rounded-2xl px-4 py-3 shadow-sm animate-scale-in ${
          isUser === "user"
            ? 'bg-(--color-dark) text-white rounded-tr-none' 
            : 'bg-(--color-off-white) text-gray-800 rounded-tl-none'
        }`}>
            {/* whitespace-pre-wrap -> preserves entered white space (tabs,space, line breaks) */}
          <p className="leading-relaxed whitespace-pre-wrap">
            {message}
            {/* {isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
            )} */}
          </p>
          
          {/* Timestamp */}
          <div className={`text-xs mt-1 self-end ${isUser === "user" ? 'text-gray-400' : 'text-gray-500'} `}>
            {time}
          </div>
        </div>
      </div>
    </div>
  );
};