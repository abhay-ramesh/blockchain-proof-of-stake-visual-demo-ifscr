// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import crypto from 'crypto'
import { Wallet } from 'ethers'
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method == 'GET') {
        const wallet = await all_wallets()
        res.status(200).json({ data: wallet })
    } else if (req.method == 'POST') {
        // Process the Uploaded File
        const random = req.body.rand

        var id = crypto.randomBytes(32).toString('hex')
        var privateKeyHash = "0x" + id
        var wallet = new Wallet(privateKeyHash)

        const privateKey = wallet.privateKey.slice(0, 20)
        const publicKey = wallet.publicKey.slice(0, 20)
        const address = wallet.address.slice(0, 10)

        if (random) {
            const wallet = await rand(address, privateKey, publicKey)
            res.status(200).json({ data: wallet })
        } else if (!random) {
            const wallet = await manual(req.body, address, privateKey, publicKey)
            res.status(200).json({ data: wallet })
        }
    }
}


// GET

const all_wallets = async () => {
    const response = await prisma.wallet.findMany({
        select: {
            address: true,
            balance: true,
            is_validator: true
        }
    })
    return response
}

// POST 


const manual = async (body, address, privateKey, publicKey) => {
    // ... you will write your Prisma Client queries here
    const rwallet = await prisma.wallet.create({
        data: {
            address: address,
            public_key: publicKey,
            private_key: privateKey,
            balance: body.balance,
            is_validator: Number(body.is_validator)
        }
    })
    return rwallet
}

const rand = async (address, privateKey, publicKey) => {
    const min = 8
    const max = 280
    // ... you will write your Prisma Client queries here
    const rwallet = await prisma.wallet.create({
        data: {
            address: address,
            public_key: publicKey,
            private_key: privateKey,
            balance: Math.floor(Math.random() * (max - min + 1)) + min,
            is_validator: Number(Math.random() < 0.1)   //10% probability of getting true
        }
    })
    return rwallet
}