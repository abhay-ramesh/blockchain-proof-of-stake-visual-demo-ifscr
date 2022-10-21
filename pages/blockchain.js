import React from 'react'

export default function Blockchain({ blocks, transactions }) {
    return (
        <div className="flex flex-row overflow-x-scroll text-white">
            {blocks.map((block, idx) => {
                return (
                    <div key={idx} className=" bg-slate-700 p-4 rounded-xl shadow-lg shadow-lime-200/60 h-fit whitespace-nowrap space-y-4 m-6 border-2 border-lime-400 text-white ">
                        <div className=" text-2xl font-bold uppercase">Block {block.block_id}</div>
                        <div className=" text-lg">Block Hash: {block.block_hash}</div>
                        <div>
                            {block.transactions.map((transaction) => {
                                return (
                                    // {transactions.find((t) => t.transaction_hash === transaction.transaction_hash)}
                                    <div>{transaction.transaction_hash} - {transaction.amount} ETH</div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}