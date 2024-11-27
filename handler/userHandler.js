const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (req, res, next) => {
	try {
		let { name, email, password } = req.body;

		if (!name || !email || !password) {
			const error = new Error("Make Sure To fill all field!");
			error.status = 400;
			throw error;
			// return res.status(400).json({
			//     status: "Failed",
			//     message: "Make Sure All field are Filled"
			// });
		}

		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});

		res.status(200).json({
			status: "Success",
			message: "User Created Successfully",
			data: newUser,
		});
	} catch (error) {
		next(error);
	}
};

const getAllUser = async (req, res, next) => {
	try {
		const getUsers = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		res.status(200).json({
			status: "Success",
			message: "Data Retrieved Successfully",
			data: getUsers,
		});
	} catch (error) {}
};

const createDeparture = async (req, res, next) => {
	try {
		let { name, departureTime, arrivalTime } = req.body;

		const timeDeparture = new Date(departureTime);
		console.log(timeDeparture);
		console.log(typeof timeDeparture);

		const newUser = await prisma.departure.create({
			data: {
				name,
				departureTime,
				arrivalTime,
			},
		});

		res.status(200).json({
			status: "Success",
			message: "Data Retrieved Successfully",
			data: newUser,
		});
	} catch (error) {
		next(error);
	}
};

function convertUTCDateToLocalDate(date) {
	// const timezoneOffsetMillis = date.getTimezoneOffset() * 60 * 1000;

	// const utc8OffsetMillis = 8 * 60 * 60 * 1000; 

	// const utc8Date = new Date(date.getTime() - timezoneOffsetMillis + utc8OffsetMillis);

	// return utc8Date;

    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
	console.log(newDate, '-> NewDate');

    var offset = date.getTimezoneOffset() / 780;
	console.log(offset, '-> offset');
	
    var hours = date.getHours();
	console.log(hours, '-> hours');
	

    newDate.setHours(hours - offset);

    return newDate;   
}

const getAllDeparture = async (req, res, next) => {
	try {
		const getUsers = await prisma.departure.findMany();

		for (let index = 0; index < getUsers.length; index++) {
			console.log(getUsers[index].departureTime, '-> UTC');
			console.log(getUsers[index].arrivalTime, '-> UTC');
			console.log('------------');
			let convertUtc1 = new Date(getUsers[index].departureTime)
			console.log(convertUtc1, '-> UTC+8');
			let convertUtc2 = new Date(getUsers[index].arrivalTime)
			console.log(convertUtc2, '-> UTC+8');
			console.log('------------');
			let date = convertUTCDateToLocalDate(new Date(getUsers[index].arrivalTime));
			console.log(date.toLocaleString());
			
		}

		// console.log(getUsers.arrivalTime);

		res.status(200).json({
			status: "Success",
			message: "Data Retrieved Successfully",
			data: getUsers,
		});
	} catch (error) {}
};

const getDeparture = async (req, res, next) => {
	try {
		let { id } = req.params.depId;
		console.log(id);
		
		const getUsers = await prisma.departure.findUnique({
			where: { id: 1 },
		});

		if (departure) {
			const departureTime = new Date(departure.departureTime);
			const hours = departureTime.getHours();
			const minutes = departureTime.getMinutes();
			const seconds = departureTime.getSeconds();
			const time = `${hours}:${minutes}:${seconds}`

			console.log(`Departure Time: ${time}`);
		}

		console.log(getUsers);

		res.status(200).json({
			status: "Success",
			message: "Data Retrieved Successfully",
			data: time,
		});
	} catch (error) {}
};

module.exports = { createUser, getAllUser, createDeparture, getAllDeparture, getDeparture };
