import React from "react";
import { Transaction, Wallet } from "../types/main";

interface ValidatorProps {
  wallet: Wallet;
  transactions: Transaction[];
  wallets: Wallet[];
  setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
  setWallet: React.Dispatch<React.SetStateAction<Wallet>>;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setBlocks: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setTempTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}
function validator({
  wallet,
  transactions,
  wallets,
  setWallets,
  setTransactions,
  setWallet,
  setBlocks,
  setTempTransactions,
}: ValidatorProps) {
  function validateTransaction(transaction: Transaction) {
    if (transaction.is_pending) {
      if (
        wallets.find((w) => w.address == transaction.from_address)?.balance >=
        transaction.amount
      ) {
        console.log("validating transaction");
        console.log("Transaction is valid");
        if (wallets.find((w) => w.address == transaction.to_address)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function doTransaction(transaction: Transaction) {
    if (validateTransaction(transaction)) {
      setWallets(
        wallets.map((w) => {
          if (w.address == transaction.to_address) {
            return {
              ...w,
              balance: Number(w.balance) + Number(transaction.amount),
            };
          } else if (w.address == transaction.from_address) {
            return {
              ...w,
              balance: Number(w.balance) - Number(transaction.amount),
            };
          } else {
            return w;
          }
        })
      );
      setTransactions(
        transactions.map((t) => {
          if (t.transaction_hash == transaction.transaction_hash) {
            return {
              ...t,
              status: "success",
              is_pending: false,
            };
          } else {
            return t;
          }
        })
      );
      setWallet({
        ...wallet,
        staked: wallet.balance + Number(transaction.gas_fees),
      });
      setTempTransactions(
        transactions.map((t) => {
          if (t.transaction_hash == transaction.transaction_hash) {
            return {
              ...t,
              status: "success",
              is_pending: false,
            };
          } else {
            return t;
          }
        })
      );
    } else {
      setTransactions(
        transactions.map((t) => {
          if (t.transaction_hash == transaction.transaction_hash) {
            return {
              ...t,
              status: "failed",
              is_pending: false,
              slashed: {
                validator: wallet.address,
                amount: Number(transaction.gas_fees) * 6,
              },
            };
          } else {
            return t;
          }
        })
      );
      setWallet({
        ...wallet,
        staked: Number(
          Number(wallet.staked) - Number(Number(transaction.gas_fees) * 6)
        ),
      });
      setWallets(
        wallets.map((w) => {
          if (w.address == wallet.address) {
            return {
              ...w,
              staked: Number(
                Number(w.staked) - Number(Number(transaction.gas_fees) * 6)
              ),
            };
          } else {
            return w;
          }
        })
      );
      setTempTransactions(
        transactions.map((t) => {
          if (t.transaction_hash == transaction.transaction_hash) {
            return {
              ...t,
              status: "failed",
              is_pending: false,
              slashed: {
                validator: wallet.address,
                amount: Number(transaction.gas_fees) * 6,
              },
            };
          } else {
            return t;
          }
        })
      );
    }
  }
  function rejectTransaction(transaction: Transaction) {
    if (!validateTransaction(transaction)) {
      setTransactions(
        transactions.map((t) => {
          if (t.transaction_hash == transaction.transaction_hash) {
            return {
              ...t,
              status: "failed",
              is_pending: false,
            };
          } else {
            return t;
          }
        })
      );
      setWallet({
        ...wallet,
        staked: Number(wallet.staked) + Number(transaction.gas_fees),
      });
      setWallets(
        wallets.map((w) => {
          if (w.address == wallet.address) {
            return {
              ...w,
              staked: Number(w.staked) + Number(transaction.gas_fees),
            };
          } else {
            return w;
          }
        })
      );
      setTempTransactions(
        transactions.map((t) => {
          if (t.transaction_hash == transaction.transaction_hash) {
            return {
              ...t,
              status: "failed",
              is_pending: false,
            };
          } else {
            return t;
          }
        })
      );
    } else {
      setTransactions(
        transactions.map((t) => {
          if (t.transaction_hash == transaction.transaction_hash) {
            return {
              ...t,
              status: "success",
              is_pending: false,
              slashed: {
                validator: wallet.address,
                amount: Number(transaction.gas_fees) * 6,
              },
            };
          } else {
            return t;
          }
        })
      );
      setWallet({
        ...wallet,
        staked: Number(wallet.staked) - Number(transaction.gas_fees) * 6,
      });
      setWallets(
        wallets.map((w) => {
          if (w.address == wallet.address) {
            return {
              ...w,
              staked: Number(w.staked) - Number(transaction.gas_fees) * 6,
            };
          } else {
            return w;
          }
        })
      );
      setTempTransactions(
        transactions.map((t) => {
          if (t.transaction_hash == transaction.transaction_hash) {
            return {
              ...t,
              status: "success",
              is_pending: false,
              slashed: {
                validator: wallet.address,
                amount: Number(transaction.gas_fees) * 6,
              },
            };
          } else {
            return t;
          }
        })
      );
    }
  }
  return (
    <>
      {/* <div className='flex flex-col text-white justify-center items-center text-center w-full'>
            <div className='flex flex-row'>
                <div className='flex flex-col space-y-4'>
                    <div className='text-6xl'>
                        Earn Rewards while Securing Ethereum
                    </div>
                    <div className='text-sm'>
                        Staking is a Public good For the Ethereum Eco-System<br />
                        Any User with any amount of ETH can help Secure the Network and Earn Rewards in the Process.
                    </div>
                </div>
            </div>
        </div> */}

      <div className=" flex flex-col mx-auto">
        {/* Show any Transaction which is pending and to be validated by the wallet address */}
        <div className="flex flex-col space-y-4 justify-center my-10 overflow-y-scroll mt-20">
          {transactions
            .filter((transaction) => transaction.validator === wallet.address)
            .map((transaction) => (
              <div
                className={
                  "flex flex-row p-4 h-min mx-16 bg-zinc-700 rounded-xl text-white " +
                  (String(transaction.status) == "pending" &&
                    " border-2 border-yellow-400 border-opacity-50") +
                  (transaction.status == "success" &&
                    " border-2 border-green-400 border-opacity-50") +
                  (transaction.status == "failed" &&
                    " border-2 border-red-400 border-opacity-50")
                }
              >
                <div className="flex flex-col w-1/2">
                  <div className="text-sm">
                    {`Transaction Hash ${transaction.transaction_hash.slice(
                      0,
                      15
                    )}...`}
                  </div>
                  <div className="text-sm">
                    From Address {transaction.from_address}
                  </div>

                  <div className="text-sm">
                    To Address {transaction.to_address}
                  </div>

                  {/* Show Both the balance in from address wallet and show the amout to be transferred */}
                  <div className="text-sm">
                    Amount {String(transaction.amount)}
                  </div>

                  <div className="text-sm">
                    Amount in that wallet
                    {String(
                      " " +
                        wallets.find(
                          (wallet) =>
                            wallet.address === transaction.from_address
                        )?.balance
                    )}
                  </div>

                  <div className="text-sm">
                    Gas Fees {String(transaction.gas_fees)}
                  </div>
                </div>
                <div className="flex flex-col w-1/2">
                  <div className="text-sm">
                    Block ID {String(transaction.block_id)}
                  </div>
                  <div className="text-sm"></div>
                  <div className="text-sm">
                    Validator {transaction.validator}
                  </div>
                  <div className="text-sm">Status {transaction.status}</div>
                  <div className="text-sm">
                    Completed {String(!transaction.is_pending ? "Yes" : "No")}
                  </div>
                  {transaction.status == "pending" && (
                    <div className=" space-x-2 m-2">
                      <button
                        onClick={() => {
                          doTransaction(transaction);
                        }}
                        className="bg-green-500 rounded-xl p-2 text-white"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          rejectTransaction(transaction);
                        }}
                        className="bg-red-500 rounded-xl p-2 text-white"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {transaction.slashed && (
                    <div className=" flex-col space-y-2 m-2">
                      <div className="text-sm p-2 border-red-500 bg-red-400 rounded-md font-bold">
                        🚨Slashed {String(transaction.slashed.amount)} ETH
                      </div>
                      <div className="text-sm p-2 border-red-500 bg-red-400 rounded-md font-bold">
                        {transaction.slashed &&
                          transaction.status == "failed" &&
                          "Transaction Failed"}
                        {transaction.slashed &&
                          transaction.status == "success" &&
                          "Transaction was Successful"}
                      </div>
                    </div>
                  )}
                  {!transaction.is_pending && !transaction.slashed && (
                    <div className=" flex-col space-y-2 m-2">
                      <div className="text-sm p-2 border-green-500 bg-green-400 rounded-md font-bold">
                        🎉Rewarded {String(Number(transaction.gas_fees))} ETH
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default validator;
