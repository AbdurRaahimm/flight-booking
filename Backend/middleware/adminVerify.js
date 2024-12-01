import jwt from "jsonwebtoken";

export const adminVerify = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    // Check if the authorization header exists
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is missing. You need to log in." });
    }

    // Extract the token from the header
    const Token = authHeader.split(" ")[1];

    // Check if the token exists after splitting
    if (!Token) {
        return res.status(401).json({ message: "Token is missing. You need to log in." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(Token, process.env.JWT_SECRET);
        const { id, username, email, role } = decoded;

        // Attach user details to the request object
        req.userid = id;
        req.username = username;
        req.email = email;
        req.role = role;

        // Check if the user is an admin
        if (req.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        next();
    } catch (error) {
        // Handle specific token verification errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired. Please log in again." });
        }
        console.error(error);
        return res.status(401).json({ message: "Invalid token." });
    }
};
