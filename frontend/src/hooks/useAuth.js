import { useSelector } from "react-redux";

export const useAuth = () => {
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading)

    return {user, loading}
}