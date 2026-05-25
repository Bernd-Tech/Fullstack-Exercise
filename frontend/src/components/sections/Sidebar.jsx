import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";
// import { useDispatch, useSelector } from "react-redux";
// import { chatApi } from "../../state/slices/chatSlice/chatApi.js";
import {
  SearchIcon,
  JournalIcon,
  PlusIcon,
  HandshakeIcon,
  SidebarIcon
} from "../ui/icons";
import { useGetSessionsQuery } from "../../state/slices/chatSlice/chatApi.js";
import SessionItem from "../chat/SessionListItem";


const Sidebar = () => {
  const { user, loading } = useAuth();
  // const [getSessions, { data, error, isLoading }] = useLazyGetSessionsQuery();
  const isAuthenticated = user && !loading;
  // const { data, error, isLoading } = useGetSessionsQuery();
  // const sessions = useSelector((state) => state.sessions);
  // const sessionsChunk = sessions.sessions.slice(0, 5);
  
  const { data: sessionsData, error, isLoading } = useGetSessionsQuery(undefined, {
    skip: !isAuthenticated
  });

  
  useEffect(() => {
    console.log("data:", sessionsData);
   console.log("error:", error);
  if (error) {
    alert(`Error fetching sessions: ${error.data.error}`);
  }
}, [isLoading, loading])

  return (
    <>
      <aside className="h-full w-full flex flex-col bg-[#2B2B2B] text-[#b9b6b6] border-r-1 border-r-white/30">
        {/* <div className="flex flex-col h-full"> */}
        <div className="flex flex-col gap-6 border-b-1 border-white/30 p-5">
          <div className="flex justify-between items-center">
            <Link to="/">
              <div>
                <p className="font-semibold linear-gradient text-2xl">
                  Essentia AI
                </p>
              </div>
            </Link>
            <div className="size-fit p-1 text-sm -translate-x-1 rounded-md cursor-pointer hover:text-(--color-text-hover) hover:bg-(--color-bg-hover-dark)" title="Close sidebar">
              <SidebarIcon size="5" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <ul className="space-y-1">
              <li className="flex items-center gap-2 p-1 text-sm -translate-x-1 rounded-md cursor-pointer hover:text-(--color-text-hover) hover:bg-(--color-bg-hover-dark)">
                <PlusIcon size="5" />
                <span>New Session</span>
              </li>
              <li className="flex items-center gap-2 p-1 text-sm -translate-x-1 rounded-md cursor-pointer hover:text-(--color-text-hover) hover:bg-(--color-bg-hover-dark)">
                <SearchIcon size="5" />
                <span>Search</span>
              </li>
              <li className="flex items-center gap-2 p-1 text-sm -translate-x-1 rounded-md cursor-pointer hover:text-(--color-text-hover) hover:bg-(--color-bg-hover-dark)">
                <JournalIcon size="5" />
                <span>Journal</span>
              </li>
              <li className="flex items-center gap-2 p-1 text-sm -translate-x-1 rounded-md cursor-pointer hover:text-(--color-text-hover) hover:bg-(--color-bg-hover-dark)">
                <HandshakeIcon size="5" />
                <span>Support Resources</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col h-full p-5 overflow-y-scroll gap-2 scroll-container">
          <p className="text-sm">Session History</p>
          <ul className="flex flex-col w-full">
            {sessionsData ? sessionsData.data.map((session) => {
              return <SessionItem title={session.title} key={session.id} sessionId={session.id}/>
            }) : (
              <p className="text-sm text-(--color-dark)">No sessions yet. Start a new session to see it here.</p>
            )}
          </ul>
        </div>
        <div className="flex p-5 border-t-1 border-t-white/30">
          <div className="size-10 rounded-full flex justify-center items-center border-1 bg-[#b9b6b6] outline-1 outline-offset-2">
            <span className="text-[#2B2B2B] font-semibold">B</span>
          </div>
          <div></div>
        </div>
        {/* </div> */}
      </aside>
    </>
  );
};

export default Sidebar;
