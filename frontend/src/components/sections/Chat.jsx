import { MessageBubble } from "../ui/MessageBubble"

export const Chat = () => {
    return (
        <>
        <div className="h-full w-full p-6">
            <div className="w-full flex flex-col border-3">
                <div className="w-full h-80 overflow-scroll border-2">
                <MessageBubble message="Hello I'm a user of Essenti Ai." />
                <MessageBubble isUser={false} message="Welcome Bernd, I'm Essentia. How can I help you today? " />
                </div>
                <div>
                    <textarea className="input-style h-24 w-full resize-none" name="" id=""></textarea>
                </div>
            </div>
        </div>
        </>
    )
}