const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTest = async (req, res, next) => {
    let {name} = req.body
    const newItem = await prisma.test.create({
        data: {
            name
        },
    });

    console.log(name);
}

const createItem = async (req, res, next) => {
    try {
        let {itemName, itemCode, itemPrice, itemStock, description} = req.body
    
        const newItem = await prisma.item.create({
            data: {
                itemName,
                itemCode,
                itemPrice: parseInt(itemPrice),
                itemStock: parseInt(itemStock),
                description
            },
        });
        
        console.log(newItem);
        res.status(200).json({
            status: "Success",
            message: "Item Created Successfully",
            data: newItem,
        });
    } catch (error) {
        next(error)
    }
}

const getAllItem = async (req, res, next) => {
	try {
		const getUsers = await prisma.item.findMany();

        res.status(200).json({
            status: "Success",
            message: "Data Retrieved Successfully",
            data: getUsers
        })
	} catch (error) {
        next(error)
    }
};

const getItemByCode = async (req, res, next) => {
    try {
        const { itemCode } = req.query
        console.log(itemCode);
        
        if (!itemCode) {
            const error = new Error("Make Sure To fill the ItemCode!");
			error.status = 400;
			throw error;
        }

        const getItem = await prisma.item.findUnique({
            where: {itemCode: itemCode}
        })

        console.log(getItem);
        

        if (!getItem) {
            const error = new Error("Item Not Found!");
			error.status = 404;
			throw error;
        }

        res.status(200).json({
            status: "Success",
            message: "Data Retrieved Successfully",
            data: getItem
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {createItem, getAllItem, getItemByCode, createTest}