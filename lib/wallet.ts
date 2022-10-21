import { randomBytes } from 'crypto'
import { Wallet } from 'ethers'

const min = 8
const max = 280

function random_balance() { return Math.floor(Math.random() * (max - min + 1)) + min }
function random_isValidator() { return Boolean(Math.random() < 0.2) }

export const createWallet = async (balance = random_balance(), is_validator = random_isValidator()) => {
    var id = randomBytes(32).toString('hex')
    var privateKeyHash = "0x" + id
    var wallet = new Wallet(privateKeyHash)

    const privateKey = wallet.privateKey.slice(0, 20)
    const publicKey = wallet.publicKey.slice(0, 20)
    const address = wallet.address.slice(0, 10)

    return {
        address: address,
        private_key: privateKey,
        balance: balance,
        is_validator: is_validator,   //10% probability of getting true
        staked:0
    }

}

export const createNewHash = () => {
    var id = randomBytes(32).toString('hex')
    var privateKeyHash = "0x" + id
    return privateKeyHash
}