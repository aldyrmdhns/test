const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const randomGenerator = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const len = 10
    let transactionCode = '';
    let loop = true

    while (loop) {
        transactionCode = '';
        for (let i = 0; i < len; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            transactionCode += characters[randomIndex];
        }

        console.log(typeof transactionCode)
        console.log(transactionCode);
        const isCodeAvailable = await prisma.transaction.findUnique({
            where: { transactionCode: transactionCode }
        });

        loop = isCodeAvailable !== null;
    }

    return transactionCode;
}

module.exports = randomGenerator