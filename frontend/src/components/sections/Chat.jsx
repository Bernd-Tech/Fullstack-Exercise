import { MessageBubble } from "../ui/MessageBubble"
import { Button } from "../ui/Button";
import { useState } from "react";
import { sendMessage, addUserMessage } from "../../state/slices/chatSlice/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';


export const Chat = () => {
    const [userMessage, setUserMessage] = useState("");
    // useSelector is a hook that subscribes the component to Redux state changes. When the selected state changes, React automatically re-renders the component.
    const messages = useSelector((state) => state.chat.messages);
    // Checking if state.chat.messages contains a pending state and either returning true or false
    const pendingMessage =  messages.some((message) => message.status === "pending");
    const buttonIsDisabled = pendingMessage;
    const dispatch = useDispatch();

    const storeUserMessage = (e) => {
        const newMessageContent = e.target.value;
        setUserMessage(newMessageContent);
    }

    const postNewMessage = (e) => {
        e.preventDefault();
        const trimmedUserMessage = userMessage.trim();
        if (trimmedUserMessage === "") {
            return;
        }

        const messageId = uuidv4();

        dispatch(addUserMessage({content: trimmedUserMessage, messageId}));
        dispatch(sendMessage({content: trimmedUserMessage, messageId}));
        
        setUserMessage("");
    };

    const handleKeyDown = (e) => {
        if (pendingMessage) {
            return;
        }
        
        if (e.key === "Enter" && !e.shiftKey && userMessage.trim() !== "") {
           postNewMessage(e);
           return;
        };

        return;
    };

    return (
        <>
        <div className="p-2 h-full">
            <div className="h-full w-full flex flex-col">
                <div className="w-full h-full overflow-y-scroll pl-6 pr-8 py-4">
                {messages.map(({messageId, role, content, timestamp = null}) => {
                    return <MessageBubble key={messageId} isUser={role} message={content} timestamp={timestamp}/>
                })}
                </div>
                <div className="flex flex-col gap-2 w-full items-center pb-1">
                <div className="w-[70%] flex justify-between gap-3">
                    <textarea onKeyDown={(e) => handleKeyDown(e)} className="w-full input-style h-16 resize-none focus:outline-none" onChange={storeUserMessage} value={userMessage}></textarea>
                    <Button text="Send" type="button" onClick={postNewMessage} disabled={buttonIsDisabled}/>
                </div>
                <div className="w-full h-4 flex justify-center text-sm text-(--color-dark)">
                    <p>
                        Essentia is an AI and can make errors. Please verify all given responses.
                    </p>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}