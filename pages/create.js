import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import axios from 'axios'
import { createWallet } from '../lib/wallet'

function create({ wallets, setWallets }) {
    const [random, setRandom] = useState(true)
    const [balance, setBalance] = useState(0)
    const [validator, setValidator] = useState(true)
    const [response, setResponse] = useState(null)

    const handleCreate = async () => {
        if (random == true) {
            const wallet = await createWallet()
            setResponse(wallet)
            setWallets(wallets => [...wallets, wallet])
            // localStorage.setItem('wallets', JSON.stringify(wallets))
            console.log(wallets)
        } else {
            const wallet = await createWallet(balance, validator)
            setResponse(wallet)
            setWallets(wallets => [...wallets, wallet]);
            // localStorage.setItem('wallets', JSON.stringify(wallets))
            console.log(wallets)
        }
    }
    return (
        <>
            <div className=' bg-black min-h-screen w-full text-white p-8 space-y-4'>
                <h1 className=' text-4xl'>Create Account</h1>
                <div className=' p-4 bg-zinc-700 border-l-2 border-lime-400'>
                    <Switch.Group>
                        <div className="flex items-center space-x-4">
                            <Switch.Label className="mr-4">Create On Random</Switch.Label>
                            <Switch
                                checked={random}
                                onChange={setRandom}
                                className={`${random ? 'bg-blue-600' : 'bg-gray-200'
                                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                            >
                                <span
                                    className={`${random ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                />
                            </Switch>
                        </div>
                    </Switch.Group>


                </div>
                {!random && <>
                    <div className=' p-4 bg-zinc-700 border-l-2 border-lime-400 space-x-4'>
                        <label>
                            Balance:
                        </label>
                        <input className=' rounded-md text-zinc-700 p-1.5' type='number' value={balance} onChange={(e) => { setBalance(e.target.value) }} />
                    </div>
                    <div className=' p-4 bg-zinc-700 border-l-2 border-lime-400 space-x-4'>
                        <label>
                            Is Validator
                        </label>
                        <input type='checkbox' className='p-2' value={validator} onChange={(e) => setValidator(e.target.value)} />
                        {/* <Switch.Group>
                            <div className="flex items-center space-x-4">
                                <Switch.Label className="mr-4">Is Validator</Switch.Label>
                                <Switch
                                    checked={validator}
                                    onChange={setValidator}
                                    className={`${validator ? 'bg-blue-600' : 'bg-gray-200'
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                >
                                    <span
                                        className={`${validator ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                    />
                                </Switch>
                            </div>
                        </Switch.Group> */}
                    </div>
                </>
                }
                {response && <div className=' p-4 bg-zinc-700 border-l-2 border-lime-400 flex-col flex'>
                    <text>Address: {response.address}</text>
                    <text>Balance: {response.balance} ETH</text>
                    <text>Validator: {Boolean(response.is_validator) ? "Yes" : "No"}</text>
                </div>}
                <button onClick={() => handleCreate()} className='bg-lime-400 px-4 py-2 rounded-md items-end'>Create</button>
            </div>
        </>
    )
}

export default create