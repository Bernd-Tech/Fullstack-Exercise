import { MessageBubble } from "../chat/MessageBubble.jsx";
import { Button } from "../ui/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  sendMessage,
  updateCurrentSessionId,
  addUserMessage,
  startResponseStream,
  clearMessages,
} from "../../state/slices/chatSlice/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
// import { loadSessionMessages } from "../../state/slices/chatSlice/chatSlice";
import { chatApi } from "../../state/slices/chatSlice/chatApi.js";
import { useGetSessionMessagesQuery } from "../../state/slices/chatSlice/chatApi.js";

export const Chat = () => {
  const { sessionId } = useParams();
  const [userMessage, setUserMessage] = useState("");
  const dispatch = useDispatch();
  // The query will be skipped if there is no user.
  const {
    data: sessionMessagesData,
    // error: sessionMessagesError,
    // isLoading: isLoadingSessionMessages,
  } = useGetSessionMessagesQuery(sessionId, {skip: !sessionId});

  const cachedMessages = sessionMessagesData?.messages?.map(m => ({
    messageId: m.id,
    content: m.content,
    role: m.role,
    timestamp: m.created_at,
    status: "fulfilled",
  })) ?? [];

  const liveMessages = useSelector((state) => state.chat.messages);

  // Append only live messages not already in the cache (by messageId).
  // This keeps history visible while new optimistic/streaming messages are added on top.
  // After cache invalidation + refetch, the newly persisted messages appear in cachedMessages
  // and the deduplication filter drops them from liveMessages automatically.
  const cachedIds = new Set(cachedMessages.map(m => m.messageId));
  const messages = [
    ...cachedMessages,
    ...liveMessages
    .filter(m => !cachedIds.has(m.messageId)),
  ];

  // Clear Redux messages when navigating to a different session so the previous
  // session's optimistic messages don't bleed into the next session's view.
  useEffect(() => {
    dispatch(clearMessages());
    dispatch(updateCurrentSessionId(sessionId));
  }, [sessionId]);
  
  const loadingStage = useSelector((state) => state.chat.loadingStage);
  // Checking if state.chat.messages contains a pending state and either returning true or false
  const pendingMessage = liveMessages.some(
    (message) => message.status === "pending",
  );
  const buttonIsDisabled = pendingMessage;

  const storeUserMessage = (e) => {
    const newMessageContent = e.target.value;
    setUserMessage(newMessageContent);
  };

  const postNewMessage = async (e) => {
    e.preventDefault();
    const trimmedUserMessage = userMessage.trim();
    if (trimmedUserMessage === "") {
      return;
    }

    const messageId = uuidv4();
    const aiResponseId = uuidv4();
    const createdAt = Date.now();

    dispatch(
      addUserMessage({ content: trimmedUserMessage, messageId, createdAt }),
    );
    dispatch(startResponseStream({ aiResponseId }));
    dispatch(
      sendMessage({
        content: trimmedUserMessage,
        messageId,
        aiResponseId,
        createdAt,
        currentSessionId: sessionId,
      }),
    );

    setUserMessage("");
  };

  const handleKeyDown = async (e) => {
    if (pendingMessage) {
      return;
    }

    if (e.key === "Enter" && !e.shiftKey && userMessage.trim() !== "") {
      await postNewMessage(e);
      console.log("sendMessage completed");

      dispatch(
        chatApi.util.invalidateTags([
          { type: "SessionMessages", id: sessionId },
        ]),
      );
      console.log("Cache invalidated");
      return;
    }
    return;
  };

  return (
    <>
      <div className="py-2 h-full">
        <div className="h-full w-full flex flex-col">
          <div className="w-full h-full overflow-y-scroll pl-6 pr-8 py-4">
            {sessionId ? (
              messages.map(
                ({ messageId, role, content, timestamp }) => {
                  return (
                    <MessageBubble
                      key={messageId}
                      role={role}
                      message={content}
                      timestamp={timestamp}
                    />
                  );
                },
              )
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                <p className="text-(--color-light) text-sm">
                  No session selected
                </p>
                <p className="text-(--color-light) text-sm">
                  Please select a session from the sidebar or start a new one.
                </p>
              </div>
            )}
            {pendingMessage && (
              <div>
                <p className="animate-pulse">{loadingStage}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full items-center pb-1">
            <div className="w-[70%] flex justify-between gap-3">
              <textarea
                onKeyDown={(e) => handleKeyDown(e)}
                className="w-full input-style h-16 resize-none focus:outline-none"
                onChange={storeUserMessage}
                value={userMessage}
              ></textarea>
              <Button
                text="Send"
                type="button"
                onClick={postNewMessage}
                disabled={buttonIsDisabled}
              />
            </div>
            <div className="w-full h-4 flex justify-center text-sm text-(--color-dark)">
              <p>
                Essentia is an AI and can make errors. Please verify all given
                responses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
