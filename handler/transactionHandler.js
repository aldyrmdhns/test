const midtrans = require("../config/midtrans");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const randomGenerator = require("../utils/randomString");
const crypto = require("crypto");

const createTransaction = async (req, res, next) => {
	try {
		const user = req.user.id;
		console.log(user);

		const { items } = req.body;

		if (!items || items.length === 0) {
			const error = new Error("No items selected");
			error.status = 400;
			throw error;
		}

		const selectedItems = await prisma.item.findMany({
			where: { id: { in: items } },
		});

		if (selectedItems.length !== items.length) {
			const error = new Error("some items not found");
			error.status = 404;
			throw error;
		}

		let totalPrice = 0;
		for (const item of selectedItems) {
			if (item.itemStock <= 0) {
				const error = new Error(
					`Item ${item.itemName} is out of stock`
				);
				error.status = 400;
				throw error;
			}
			totalPrice += item.itemPrice;
		}

		const orderId = await randomGenerator();
		console.log(orderId, "-> On Handler");

		const transactionDetails = {
			transaction_details: {
				order_id: orderId,
				gross_amount: totalPrice,
			},
			customer_details: {
				first_name: req.user.name,
				email: req.user.email,
			},
			item_details: selectedItems.map((item) => ({
				id: item.id,
				price: item.itemPrice,
				quantity: 1,
				name: item.itemName,
			})),
		};

		const midtransResponse = await midtrans.createTransaction(
			transactionDetails
		);

		const newTransaction = await prisma.transaction.create({
			data: {
				transactionCode: orderId,
				buyerName: req.user.name,
				totalPrice,
				paymentMethod: "pending",
				status: "pending",
				expiredDate: new Date(Date.now() + 60 * 60 * 1000),
				userId: user,
				items: {
					connect: selectedItems.map((item) => ({ id: item.id })),
				},
			},
		});

		res.status(201).json({
			message: "Transaction created successfully",
			token: midtransResponse,
		});
	} catch (error) {
		next(error);
	}
};

const midtransNotification = async (req, res, next) => {
    try {
        const notification = req.body;
        console.log("Valid notification received:", notification);

        const statusResponse = await midtrans.transaction.notification(notification);
        const { order_id, transaction_status, payment_type } = statusResponse;
        console.log(statusResponse, '-> The Response');

        let newStatus;
        switch (transaction_status) {
            case "settlement":
                newStatus = "paid";
                break;
            case "pending":
                newStatus = "pending";
                break;
            case "deny":
            case "cancel":
            case "expire":
                newStatus = "failed";
                break;
            default:
                newStatus = "error";
        }

        await prisma.transaction.update({
            where: { transactionCode: order_id },
            data: {
                paymentMethod: payment_type,
                status: newStatus,
            },
        });

        res.status(200).json({ message: "Payment status updated" });
    } catch (error) {
        next(error)
    }
}

// const midtransCallback = async (req, res, next) => {
// 	try {
// 		const { order_id, transaction_status, payment_type } =req.body;

// 		const transaction = await prisma.transaction.findUnique({
// 			where: { transactionCode: order_id },
// 		});

// 		if (!transaction) {
// 			const error = new Error("Transaction not found");
// 			error.status = 404;
// 			throw error;
// 		}

// 		let newStatus;
// 		switch (transaction_status) {
// 			case "settlement":
// 				newStatus = "paid";
// 				break;
// 			case "pending":
// 				newStatus = "pending";
// 				break;
// 			case "deny":
// 			case "cancel":
// 			case "expire":
// 				newStatus = "failed";
// 				break;
// 			default:
// 				newStatus = "error";
// 		}

// 		await prisma.transaction.update({
// 			where: { transactionCode: order_id },
// 			data: {
// 				paymentMethod: payment_type,
// 				status: newStatus,
// 			},
// 		});

// 		res.status(200).json({ message: "Payment status updated" });
// 	} catch (error) {
//         next(error);
//     }
// };

const getAllTransaction = async (req, res, next) => {
	try {
		const getTransactions = await prisma.transaction.findMany();

		res.status(200).json({
			status: "Success",
			message: "Data Retrieved Successfully",
			data: getTransactions,
		});
	} catch (error) {}
};

module.exports = { createTransaction, getAllTransaction, midtransNotification };
