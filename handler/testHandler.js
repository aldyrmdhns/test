const midtrans = require("../config/midtrans");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Notification = async (req, res, next) => {
    try {
        const notification = req.body;
        console.log("Valid notification received:", notification);

        return notification
    } catch (error) {
        next(error)
    }
}

module.exports = Notification