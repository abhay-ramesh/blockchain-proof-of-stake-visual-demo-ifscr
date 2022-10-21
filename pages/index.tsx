import React, { useState } from "react";
import { createNewHash } from "../lib/wallet";
import { Block, Transaction, Wallet } from "../types/main";

interface HomeProps {
  wallet: Wallet;
  blocks: Block[];
  wallets: Wallet[];
  transactions: Transaction[];
  tempTransactions: Transaction[];
  setTempTransactions;
  setWallet;
  setWallets;
  setTransactions;
}

function Home({
  wallet,
  blocks,
  wallets,
  transactions,
  setTempTransactions,
  tempTransactions,
  setWallet,
  setWallets,
  setTransactions,
}: HomeProps) {
  const [status, setStatus] = useState(null);

  function doTransaction(e) {
    e.preventDefault();
    // console.log({ ...wallet, balance: wallet.balance - e.target[2].value });
    // setWallets;
    const Validator = wallets.filter((item) => item.is_validator)[
      Math.floor(
        Math.random() * wallets.filter((item) => item.is_validator).length
      )
    ].address;

    setTempTransactions([
      ...tempTransactions,
      {
        transaction_hash: createNewHash(),
        from_address: wallet.address,
        to_address: e.target[1].value,
        is_pending: true,
        amount: Number(e.target[2].value) - Number(e.target[2].value * 0.001),
        gas_fees: Number(e.target[2].value * 0.001),
        block_id: blocks.length + 1,
        // For Validator use any wallet in random address which has is_validator: true with each time different wallet
        validator: Validator,
        status: "pending",
      },
    ]);
    setTransactions([
      ...transactions,
      {
        transaction_hash: createNewHash(),
        from_address: wallet.address,
        to_address: e.target[1].value,
        is_pending: true,
        amount: Number(e.target[2].value) - Number(e.target[2].value * 0.001),
        gas_fees: Number(e.target[2].value * 0.001),
        block_id: blocks.length + 1,
        validator: Validator,
        status: "pending",
      },
    ]);

    setStatus({ status: true, text: "Transaction Initiated" });
  }

  return (
    <>
      <div className="flex flex-row ">
        <div className="flex flex-col ">
          <div className=" bg-slate-700 p-4 rounded-xl shadow-lg shadow-lime-200/60 w-fit space-y-4 m-6 border-2 border-lime-400 text-white">
            <div className=" text-4xl">Transact</div>
            <form
              onSubmit={(e) => {
                doTransaction(e);
              }}
              className=" space-y-4 w-full"
            >
              <div className="flex flex-col">
                <label className="" htmlFor="from">
                  From Address:
                </label>
                <input
                  id="from"
                  type="text"
                  className=" rounded-md p-1 bg-gray-600"
                  value={wallet.address}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label className="" htmlFor="to">
                  To Address:
                </label>
                <input
                  id="to"
                  type="text"
                  className=" rounded-md p-1  bg-gray-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="" htmlFor="amount">
                  Amount:
                </label>
                <input
                  id="amount"
                  type="number"
                  className=" rounded-md p-1  bg-gray-500"
                  required
                />
              </div>
              <div className=" flex flex-row space-x-2">
                <button
                  type="submit"
                  className=" bg-white px-4 py-2 rounded-lg hover:shadow-lg hover:border-black hover:border text-black"
                >
                  Send
                </button>
                <button
                  type="reset"
                  className=" bg-white px-4 py-2 rounded-lg hover:shadow-lg hover:border-black hover:border text-black"
                >
                  Clear
                </button>
              </div>
            </form>
            {status && (
              <div
                className={
                  " w-fit text-white rounded-md p-1 " +
                  (Boolean(status.status) == true
                    ? " bg-lime-400 border-2 border-lime-500 "
                    : " bg-red-600 border-2 border-red-700")
                }
              >
                {status.text}
              </div>
            )}
          </div>
          {/* <div className="flex flex-col  text-white">
          {blocks.map((block, idx) => {
            return (
              <>
                <div
                  key={idx}
                  className=" bg-slate-700 p-4 rounded-xl shadow-lg shadow-lime-200/60 h-fit whitespace-nowrap space-y-4 m-6 border-2 border-lime-400 text-white "
                >
                  <>
                    <div className=" text-2xl font-bold uppercase">
                      {`Block ${block.block_id}`}
                    </div>
                    <div className=" text-lg">
                      Block Hash: {block.block_hash}
                    </div>
                    <div>
                      {block.transactions.map((transaction) => {
                        return (
                          <div>
                            {transaction.transaction_hash +
                              "- " +
                              +transaction.amount +
                              " ETH"}
                          </div>
                        );
                      })}
                    </div>
                  </>
                </div>
              </>
            );
          })}
        </div> */}
        </div>
        <div className="flex flex-col  text-white m-6">
          <text className=" text-2xl font-bold uppercase">
            Account Transactions
          </text>
          <div className=" overflow-y-scroll">
            {transactions
              .filter((transaction) => {
                return (
                  transaction.from_address === wallet.address ||
                  transaction.to_address === wallet.address
                );
              })
              .map((transaction, idx) => {
                return (
                  <>
                    <div
                      key={idx}
                      className={
                        " bg-slate-700 p-4 rounded-xl shadow-lg  h-fit space-y-4 m-6 border-2  text-white " +
                        (transaction.status == "pending" &&
                          "animate-pulse shadow-orange-400/60 border-orange-500") +
                        (transaction.status == "failed" &&
                          "shadow-red-400/60 border-red-400") +
                        (transaction.status == "success" &&
                          "shadow-lime-400/60 border-lime-400")
                      }
                    >
                      <>
                        <div className=" text-lg font-bold uppercase ">
                          Transaction{" "}
                        </div>
                        <div className=" text-sm text-clip w-20">
                          {transaction.transaction_hash}
                        </div>
                        <div className=" text-sm">
                          From: {transaction.from_address}
                        </div>
                        <div className=" text-sm">{`To: ${transaction.to_address}`}</div>
                        <div className=" text-sm">{`Amount: ${transaction.amount}`}</div>
                        <div className=" text-sm">
                          {`Gas Fees: ${transaction.gas_fees}`}
                        </div>
                        <div className=" text-sm">
                          {`Block ID: ${transaction.block_id}`}
                        </div>
                        <div className=" text-sm">
                          Validator: {transaction.validator}
                        </div>
                        <div className=" text-sm">
                          Completed: {!transaction.is_pending ? "Yes" : "No"}
                        </div>
                      </>
                    </div>
                  </>
                );
              })}
            {/* Show Transactions Made and got from current wallet */}
            {/* {transactions
              .filter((transaction) => {
                return (
                  transaction.from_address === wallet.address ||
                  transaction.to_address === wallet.address
                );
              }) */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

// function BlockDisplay(blockz: Block[]) {
//   const colors = {
//     success: "bg-green-600",
//     failed: "bg-red-600",
//     start: "bg-gray-600 animate-pulse",
//     processing: "bg-orange-600 animate-pulse",
//   };

//   return (
//     <div className="p-4 flex flex-col justify-between text-white space-y-4 ">
//       <div className=" flex flex-col space-y-4 ">
//         {blockz.map((block) => {
//           const color = colors[String(block.status)];
//           return (
//             <div
//               className={
//                 "h-10 w-10 text-center flex items-center justify-center " +
//                 color
//               }
//             >
//               <div className="">{Number(block.block_id)}</div>
//             </div>
//           );
//         })}
//       </div>
//       <div className=" space-y-4 h-full flex flex-col items-start ">
//         <div className="flex flex-row items-center space-x-1">
//           <div className="h-4 w-4 text-center flex items-center justify-center bg-green-600"></div>
//           <text>- Success</text>
//         </div>
//         <div className="flex flex-row items-center space-x-1">
//           <div className="h-4 w-4 text-center flex items-center justify-center bg-red-600"></div>

//           <text>- Failure</text>
//         </div>
//         <div className="flex flex-row items-center space-x-1">
//           <div className="h-4 w-4 text-center flex items-center justify-center bg-orange-600"></div>
//           <text>- Processing</text>
//         </div>
//         <div className="flex flex-row items-center space-x-1">
//           <div className="h-4 w-4 text-center flex items-center justify-center bg-gray-600"></div>
//           <text>- Starting</text>
//         </div>
//       </div>
//     </div>
//   );
// }
