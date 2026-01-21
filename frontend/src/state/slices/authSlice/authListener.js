import { supabase } from "../../../supabase-client";
import { setUser, clearUser } from "./authSlice";

export const setupAuthListener = async (store) => {
    try {
        const {data, error} = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session) {
            store.dispatch(setUser(data.session));
            console.log("user is logged in: ", data.session)
        } else {
            store.dispatch(clearUser());
            console.log("user is signed out.")
        }

        supabase.auth.onAuthStateChange((event, session) => {
            console.log(`Event: ${event}`)
            console.log(`Session: ${session}`)

            if (event === "SIGNED_IN") {
                store.dispatch(setUser(session));
                console.log("user is logged in: ", session)
            }

            // if signed out, local and session storage have to be cleared and state updated
            if (event === "SIGNED_OUT") {
                // or simpler without looping through entire storage:
                // window.sessionStorage.clear()
                // window.localStorage.clear()
               [
                window.sessionStorage, 
                window.localStorage
                ].forEach((storage) => {
                    Object.entries(storage).forEach(([key]) => {
                        storage.removeItem(key);
                    })
                })
                console.log("Session and local storage have been cleared.");
                store.dispatch(clearUser());
                console.log("user is signed out.")
            }
        })

    } catch (err) {
        console.log("Error: ", err)
        store.dispatch(clearUser());
    }
}

