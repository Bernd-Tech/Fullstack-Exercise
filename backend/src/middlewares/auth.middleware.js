import supabase from "../config/database/supabase";

const authMiddleWare = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({error: "Unauthorized"})
        }

        const token = authHeader.split(' ')[1];

        const { data, error } = await supabase.auth.getClaims(token);

        if (error) {
            return res.status(401).json({error: "Invalid access token"})
        }

        req.user = {id: data.claims.sub}
        next();
    } catch (error) {
        console.log("Auth middleware error:", error.message);
        res.status(401).json({error: "Unauthorized"});
    }
};

export default authMiddleWare;
