import { useEffect, useState } from "react";

export const useClickOutside = ({elementRef, initialState = false, eventType, onClose}) => {
    const [isOpen, setIsOpen] = useState(initialState)

    useEffect(() => {
        const close = (e) => {
        if (elementRef.current && !elementRef.current.contains(e.target))
            setIsOpen(false);
            if (onClose) onClose();
        };

        document.addEventListener(eventType, close);
        return () => document.removeEventListener(eventType, close);

        // Have to add elementRef, eventType and onClose function to dependency array because:
        // The listener always uses the current ref
        // The listener uses the current event type
        // The listener uses the current onClose function
    }, [elementRef, eventType, onClose])

    return {isOpen, setIsOpen}
}