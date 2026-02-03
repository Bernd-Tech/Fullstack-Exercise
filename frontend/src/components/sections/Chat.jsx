import { MessageBubble } from "../ui/MessageBubble"
import { Button } from "../ui/Button";
import { useState } from "react";
import { sendMessage, addUserMessage } from "../../state/slices/chatSlice/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';


export const Chat = () => {
    const [userMessage, setUserMessage] = useState("");
    const messages = useSelector((state) => state.chat.messages);
    const dispatch = useDispatch();
    console.log("These are the messages in state.messages: ", messages);

    const storeUserMessage = (e) => {
        const newMessageContent = e.target.value;
        setUserMessage(newMessageContent);
    }
    console.log("The user entered: ", userMessage);

    const postNewMessage = (e) => {
        e.preventDefault();
        const messageId = uuidv4();
        console.log("user message id: ", messageId)

        dispatch(addUserMessage({content: userMessage, messageId}));
        dispatch(sendMessage({content: userMessage, messageId}));
        setUserMessage("")
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
                    <textarea className="w-full input-style h-16 resize-none focus:outline-none" onChange={storeUserMessage} value={userMessage}></textarea>
                    <Button text="Send" type="button" onClick={postNewMessage}/>
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