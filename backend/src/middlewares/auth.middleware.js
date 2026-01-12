import supabase from "../config/database/supabase";

const authMiddleWare = async (req, res, next) => {
    try {
        // Express converts headers to lowercase and removes capitals
        // storing authorization value in new variable
        const authHeader = req.headers.authorization;

        // checking if authorization value exists and starts with "Bearer"
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({error: "Unauthorized"})
        }

        //Splitting authorization value into "Bearer" and token value and assigning token value to token variable
        const token = authHeader.split(' ')[1];

        //verifiyng extracted token with getClaims() supabase function
        const { data, error } = await supabase.auth.getClaims(token);

        if (error) {
            return res.status(401).json({error: "Invalid access token"})
        }

        // attaching a user property to req object with id of verified user
        req.user = {id: data.claims.sub}
        next();
    } catch (error) {
        console.log("Auth middleware error:", error.message);
        res.status(401).json({error: "Unauthorized"});
    }
};

export default authMiddleWare;
