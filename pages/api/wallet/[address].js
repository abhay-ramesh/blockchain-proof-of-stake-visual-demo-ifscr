// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export default function handler(req, res) {
    const { address } = req.query
    res.status(200).json({ name: 'John Doe' })
}
