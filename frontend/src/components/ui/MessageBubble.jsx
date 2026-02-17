import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const MessageBubble = ({ message, role = "user", timestamp}) => {
    const {user} = useAuth();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleSpeak = async () => {
    try {
      setIsLoading(true);
      
      // Call your backend endpoint
      const response = await fetch("http://localhost:3001/api/chat/speak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.access_token}` // if needed
        },
        body: JSON.stringify({ text: message })
      });

      if (!response.ok) throw new Error("Failed to generate speech");

      // Convert response to blob and play it
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.play();
      
    } catch (error) {
      console.error("Speech error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex ${role === "user" ? 'justify-end' : 'justify-start'} mb-8 animate-fade-in`}>
      <div className={`flex items-start max-w-[70%] ${role === "user" ? 'flex-row-reverse' : 'flex-row'}`}>

        {/* Message Content */}
        <div className={`flex flex-col rounded-2xl px-4 py-3 shadow-sm animate-scale-in ${
          role === "user"
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
          <div className={`text-xs mt-1 self-end ${role === "user" ? 'text-gray-400' : 'text-gray-500'} `}>
            {time}
          </div>
        </div>
        {role === "assistant" && (
        <button 
          onClick={handleSpeak}
          disabled={isLoading || isPlaying}
          className="p-2 hover:bg-gray-200 rounded-lg transition"
          title="Listen to response"
        >
            Voice
        </button>
      )}
      </div>
    </div>
  );
};