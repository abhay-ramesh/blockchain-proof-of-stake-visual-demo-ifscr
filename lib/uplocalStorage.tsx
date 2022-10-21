import { useEffect } from "react";
import { Block, Transaction, Wallet } from "../types/main";
import { createNewHash } from "./wallet";

export function updateLocalStorage(
  setWallets,
  setWallet,
  setBlocks,
  setTransactions,
  setTempTransactions,
  wallet: Wallet,
  wallets: Wallet[],
  blocks: Block[],
  transactions: Transaction[],
  tempTransactions: Transaction[]
) {
  useEffect(() => {
    setWallets(
      JSON.parse(localStorage.getItem("wallets")) || [
        {
          address: "0x07b122c1",
          private_key: "0x2ccf5b61ab081dfa3e",
          balance: 1000,
          is_validator: true,
        },
      ]
    );
    setWallet(
      JSON.parse(localStorage.getItem("wallet")) || {
        address: "0x07b122c1",
        private_key: "0x2ccf5b61ab081dfa3e",
        balance: 1000,
        is_validator: true,
      }
    );
    setBlocks(JSON.parse(localStorage.getItem("blocks")) || []);
    setTransactions(JSON.parse(localStorage.getItem("transactions")) || []);
    setTempTransactions(
      JSON.parse(localStorage.getItem("tempTransactions")) || []
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("wallet", JSON.stringify(wallet));
    localStorage.setItem("wallets", JSON.stringify(wallets));
    localStorage.setItem("blocks", JSON.stringify(blocks));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [wallets, wallet, blocks, transactions]);
  useEffect(() => {
    if (tempTransactions.length == 3) {
      setBlocks([
        ...blocks,
        {
          block_id: blocks.length + 1,
          block_hash: createNewHash(),
          status: "processing",
          transactions: tempTransactions,
        },
      ]);
      console.log([
        ...blocks,
        {
          block_id: blocks.length + 1,
          block_hash: createNewHash(),
          status: "processing",
          transactions: tempTransactions,
        },
      ]);
      setTempTransactions([]);
    }
    localStorage.setItem("tempTransactions", JSON.stringify(tempTransactions));
  }, [tempTransactions]);
  // useEffect(() => {
  //   localStorage.setItem("blocks", JSON.stringify(blocks));
  //   localStorage.setItem("transactions", JSON.stringify(transactions));
  // }, [wallets, wallet, blocks, transactions]);
}
