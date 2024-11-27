const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
	const token = req.cookies.token || req.headers.authorization?.split(" ")[1];;

	try {
		if (!token) {
			const error = new Error("Unauthorized Person!!!");
			error.isAuthMiddleware = true;
			error.statusCode = 401;
			throw error;
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
			if (err) {
				res.clearCookie("token");
				const error = new Error("Unauthorized Person");
				error.isAuthMiddleware = true;
				error.statusCode = 401;
				throw error;
			}

            req.user = {
                id: decode.id,
                email: decode.email,
                name: decode.name
            };

			console.log(req.user, "-> from authMiddleware");
			next();
		});
	} catch (error) {
		next(error);
	}
};

module.exports = authentication;
