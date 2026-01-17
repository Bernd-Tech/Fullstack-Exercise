import { MessageBubble } from "../ui/MessageBubble"
import { Button } from "../ui/Button";
import { useState, useEffect } from "react";


export const Chat = () => {
    const [messages, setMessages] = useState();

    const testMessages = [
        {
            id: 1,
            role: "user",
            message: "Hello I'm a user of Essenti Ai."
        }, 
        {
            id: 2,
            role: "assistant",
            message: "Welcome Bernd, I'm Essentia. How can I help you today? "
        },
        {
            id: 3,
            role: "user",
            message: "I feel very tired and exhausted in the last days. Do you think it might be due to the stress at my work? Please answer in one sentence."
        },
        {
            id: 4,
            role: "assistant",
            message: "Yes, work stress can contribute to fatigue, but other factors like sleep, nutrition, or illness could also be involved—how long has this been happening and what’s been different lately in your routine or at work?"
        },
         {
            id: 5,
            role: "assistant",
            message: "Yes, work stress can contribute to fatigue, but other factors like sleep, nutrition, or illness could also be involved—how long has this been happening and what’s been different lately in your routine or at work?"
        },
         {
            id: 6,
            role: "user",
            message: "Yes, work stress can contribute to fatigue, but other factors like sleep, nutrition, or illness could also be involved—how long has this been happening and what’s been different lately in your routine or at work?"
        }
    ];

    useEffect(() => {
        setMessages(testMessages);
    }, [messages]);

    // const postMessage = () => {

    // }

    return (
        <>
        <div className="p-2 h-full">
            <div className="h-full w-full flex flex-col">
                <div className="w-full h-full overflow-y-scroll pl-6 pr-8 py-4">
                {messages.map(({id, role, message}) => {
                    return <MessageBubble key={id} isUser={role} message={message}/>
                })}
                </div>
                <div className="flex flex-col gap-2 w-full items-center pb-1">
                <div className="w-[70%] flex justify-between gap-3">
                    <textarea className="w-full input-style h-16 resize-none focus:outline-none "></textarea>
                    <Button text="Send" type="button"/>
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