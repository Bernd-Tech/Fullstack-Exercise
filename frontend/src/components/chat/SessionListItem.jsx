import { useState, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside.js";
import { 
    DotsIcon,
    DeleteIcon,
    PencilIcon
} from "../ui/icons.jsx";

/**
 * SessionItem
 *
 * Props:
 *  - id          {string}   Unique session ID (used to build href)
 *  - title       {string}   Session title shown in the list
 *  - isActive    {boolean}  Whether this session is currently open
 *  - onOptions   {function} Callback fired when the "..." button is clicked,
 *                           receives the event as argument so you can anchor a context menu
 *  - basePath    {string}   Base URL prefix for sessions (default: "/chat")
 */
export default function SessionItem({
  sessionId,
  title,
  isActive = false,
  basePath = "/ai-guide",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const itemOptions = useRef(null);
  const { isOpen, setIsOpen } = useClickOutside({
    elementRef: itemOptions,
    eventType: "mousedown",
  });
  const href = `${basePath}/${sessionId}`;

  return (
    <li className="opacity-100" ref={itemOptions}>
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Session link */}
        <a
          href={href}
          aria-current={isActive ? "page" : undefined}
          className={`-translate-x-2 duration-75 flex items-center w-full h-8 px-2 py-1.5 rounded-md text-xs font-medium whitespace-nowrap overflow-hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-(--color-text-hover)  ${
            isActive
              ? "bg-(--color-bg-hover-dark)"
              : "hover:bg-(--color-bg-hover-dark)"
          }`}
        >
          {/* Fade-out mask toward the right edge to prevent title clashing with the options button */}
          {/* flex container + "truncate on child element -> "..." at the end of span" */}
          <span
            className={`truncate text-sm flex-1 [mask-size:100%_100%] ${
              isHovered || isActive
                ? "[mask-image:linear-gradient(to_right,black_78%,transparent_95%)]"
                : "[mask-image:linear-gradient(to_right,black_90%,transparent_100%)]"
            }`}
          >
            {title}
          </span>
        </a>

        {/* Options button — always visible when active, fades in on hover otherwise */}
        <div
          className={`absolute right-0 top-1/2  hover:bg-(--color-bg-hover-dark) rounded-md -translate-y-1/2 transition-opacity duration-75 focus:bg-(--color-bg-hover-dark) ${
            isHovered || isActive
              ? "opacity-100 bg-(--color-bg-hover-dark)"
              : "opacity-0"
          }`}
        >
          <button
            type="button"
            aria-label={`More options for ${title}`}
            aria-haspopup="menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer hover:text-(--color-text-hover) flex items-center justify-center h-8 w-8 rounded-md active:bg-(--color-bg-hover-dark) focus:bg-(--color-bg-hover-dark)"
          >
            <DotsIcon size="5" />
          </button>
        </div>
        {isOpen && (
        <>
          <div className="z-99 text-sm p-2 dropdown-content rounded-lg w-fit top-9 right-0 bg-[#2B2B2B] border border-(--color-light)/20 animate-scale-in">
              <div className="px-3 py-1.5 cursor-pointer flex rounded-lg items-center gap-2 hover:bg-(--color-bg-hover-dark) hover:text-(--color-text-hover)">
                <div className="w-5 h-5 flex justify-center items-center">
                    <PencilIcon size="5" />
                </div>
                <span>Rename</span>
              </div>
              <div className="px-3 py-1.5 text-(--color-danger) cursor-pointer flex rounded-lg items-center gap-2 hover:bg-(--color-bg-danger)">
                <div className="w-5 h-5 flex justify-center items-center">
                <DeleteIcon size="5" />
                </div>
                <span>Delete</span>
              </div>
            </div>
        </>
      )}
      </div>
    </li>
  );
}
