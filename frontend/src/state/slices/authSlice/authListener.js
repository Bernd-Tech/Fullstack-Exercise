import { supabase } from "../../../supabase-client";
import { setUser, clearUser } from "./authSlice";

export const setupAuthListener = async (store) => {
    try {
        const {data, error} = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session.user) {
            store.dispatch(setUser(data.session.user));
            console.log("user is logged in: ", data.session.user)
        } else {
            store.dispatch(clearUser());
            console.log("user is not logged in.")
        }
    } catch (err) {
        console.log("Error restoring session: ", err)
        store.dispatch(clearUser());
    }
}

