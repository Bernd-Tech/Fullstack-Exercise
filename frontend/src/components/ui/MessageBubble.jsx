import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const MessageBubble = ({ message, role = "user", timestamp }) => {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSpeak = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:3001/api/chat/speak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`, // if needed
        },
        body: JSON.stringify({ text: message }),
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
    <div
      className={`flex ${
        role === "user" ? "justify-end" : "justify-start"
      } mb-8 animate-fade-in`}
    >
      <div
        className={`flex items-start max-w-[70%] ${
          role === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="flex flex-col">
        {/* Message Content */}
        <div
          className={`flex flex-col rounded-2xl px-4 py-3 shadow-sm animate-scale-in ${
            role === "user"
              ? "bg-(--color-dark) text-white rounded-tr-none"
              : "bg-(--color-off-white) text-gray-800 rounded-tl-none"
          }`}
        >
          {/* whitespace-pre-wrap -> preserves entered white space (tabs,space, line breaks) */}
          <p className="leading-relaxed whitespace-pre-wrap">
            {message}
            {/* {isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
            )} */}
          </p>
            
            <div className="flex gap-1 text-xs mt-1 self-end">
        {role === "assistant" && (
          <div title="Listen to response" className="flex items-end w-fit hover:cursor-pointer">
            <svg
            onClick={handleSpeak}
              disabled={isLoading || isPlaying}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-500"
              title="Listen to response"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          </div>
        )}
          {/* Timestamp */}
          <div
            className={`text-xs mt-1 self-end ${
              role === "user" ? "text-gray-400" : "text-gray-500"
            } `}
          >
            {time}
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
