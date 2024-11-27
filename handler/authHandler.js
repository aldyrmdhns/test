const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const login = async(req, res, next) => {
    try {
        let { email, password} = req.body
        const user = await prisma.user.findUnique({ where: { email: email } });

        console.log(user);
        
        if (!user) {
            const error = new Error("User Not Found!");
			error.status = 404;
			throw error;
        }

        console.log(process.env.JWT_SECRET);
        const accessToken = jwt.sign({id: user.id, name: user.name ,email: user.email}, process.env.JWT_SECRET, {expiresIn: "3h"})
        console.log(accessToken);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 3 * 60 * 60 * 1000
        })

        res.status(200).json({
            status: "Success",
            message: "Login Successfull",
            accessToken: accessToken
        })
    } catch (error) {
        next(Error)
    }
}

module.exports = login