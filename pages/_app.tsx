import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { WalletsList } from "../components/WalletList";
import { updateLocalStorage } from "../lib/uplocalStorage";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // For Build
  const [wallets, setWallets] = useState([
    {
      address: "0x07b122c1",
      private_key: "0x2ccf5b61ab081dfa3e",
      balance: 1000,
      is_validator: true,
      staked: 100,
    },
  ]);
  const [wallet, setWallet] = useState(
    wallets[0] || {
      address: "0x07b122c1",
      private_key: "0x2ccf5b61ab081dfa3e",
      balance: 1000,
      is_validator: true,
      staked: 100,
    }
  );
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [tempTransactions, setTempTransactions] = useState([]);

  // For Development
  // const [wallets, setWallets] = useState([
  //   {
  //     address: "0xE3A65EC4",
  //     private_key: "0xa886fe9009ead03618",
  //     balance: 24,
  //     is_validator: false,
  //     staked: 0,
  //   },
  //   {
  //     address: "0xAe14B9c7",
  //     private_key: "0x6b3ee69adafe272587",
  //     balance: 277,
  //     is_validator: true,
  //     staked: 32,
  //   },
  //   {
  //     address: "0x4E9181F5",
  //     private_key: "0x12ba119e72beeb244b",
  //     balance: 152,
  //     is_validator: false,
  //     staked: 0,
  //   },
  //   {
  //     address: "0xe824B784",
  //     private_key: "0x8793e5fa6c2ef51c9d",
  //     balance: 23,
  //     is_validator: false,
  //     staked: 0,
  //   },
  //   {
  //     address: "0xf253b85c",
  //     private_key: "0x5b51765e58fe164b0f",
  //     balance: 197,
  //     is_validator: false,
  //     staked: 0,
  //   },
  //   {
  //     address: "0xEA940578",
  //     private_key: "0x2071cdc8ae0ffeca51",
  //     balance: 241,
  //     is_validator: false,
  //     staked: 0,
  //   },
  // ]);
  // const [wallet, setWallet] = useState(wallets[0]);
  // const [blocks, setBlocks] = useState([
  //   {
  //     block_id: 1,
  //     block_hash:
  //       "0x29956054f171c85a16631452ec26bd7e02b8fa6e5d50fafb2f980ee35df73416",
  //     status: "processing",
  //     transactions: [
  //       {
  //         transaction_hash:
  //           "0xbd116399cdd254bac8e1941c5b5f8b79496eedd3c2367e8b3fe55229ca20acc3",
  //         from_address: "0x4E9181F5",
  //         to_address: "0x4E9181F5",
  //         is_pending: true,
  //         amount: 1.998,
  //         gas_fees: 0.002,
  //         block_id: null,
  //         validator: "0xAe14B9c7",
  //         status: "processing",
  //       },
  //       {
  //         transaction_hash:
  //           "0x7549f03cb88f82e5c02c58007d8d5df798c5a491a77ab7a4d3dc30255f1ac8e0",
  //         from_address: "0x4E9181F5",
  //         to_address: "0x4E9181F5",
  //         is_pending: true,
  //         amount: 2.997,
  //         gas_fees: 0.003,
  //         block_id: null,
  //         validator: "0xAe14B9c7",
  //         status: "failed",
  //       },
  //       {
  //         transaction_hash:
  //           "0x0b116180aecf8ca9c8a2977df95419581dfc42beda2f1f93254033bb49935d92",
  //         from_address: "0x4E9181F5",
  //         to_address: "0x4E9181F5",
  //         is_pending: true,
  //         amount: 7.992,
  //         gas_fees: 0.008,
  //         block_id: null,
  //         validator: "0xAe14B9c7",
  //         status: "success",
  //       },
  //     ],
  //   },
  // ]);
  // const [transactions, setTransactions] = useState([
  //   {
  //     transaction_hash:
  //       "0xf09acb96ed0e15de46133933acd86598f85807ad214e3f57ed0fd86e63a0e093",
  //     from_address: "0x4E9181F5",
  //     to_address: "0xe824B784",
  //     is_pending: true,
  //     amount: 1.998,
  //     gas_fees: 0.002,
  //     block_id: 2,
  //     validator: "0xAe14B9c7",
  //     status: "pending",
  //   },
  //   {
  //     transaction_hash:
  //       "0xdc36556aa6a67b50fba11d9c9e4f89afbffa7275748e6886a390ff0721d30cf1",
  //     from_address: "0x4E9181F5",
  //     to_address: "0xf253b85c",
  //     is_pending: true,
  //     amount: 1.998,
  //     gas_fees: 0.002,
  //     block_id: 3,
  //     validator: "0xAe14B9c7",
  //     status: "pending",
  //   },
  // ]);
  // const [tempTransactions, setTempTransactions] = useState([
  //   {
  //     transaction_hash:
  //       "0x57db8eb376cf1f5bb24b769ae045aa543265a832880e0f0a8af1d776245577e0",
  //     from_address: "0x4E9181F5",
  //     to_address: "0x4E9181F5",
  //     is_pending: true,
  //     amount: 11.988,
  //     gas_fees: 0.012,
  //     block_id: null,
  //     validator: "0xAe14B9c7",
  //     status: "processing",
  //   },
  //   {
  //     transaction_hash:
  //       "0x9a935e91828b670d731095ab3e507cfe049605540e929efb863284ec2847b6e7",
  //     from_address: "0x4E9181F5",
  //     to_address: "0x4E9181F5",
  //     is_pending: true,
  //     amount: 0.999,
  //     gas_fees: 0.001,
  //     block_id: null,
  //     validator: "0xAe14B9c7",
  //     status: "success",
  //   },
  // ]);

  // Doesnt work with React Strict Mode or Strict in Dev Env
  updateLocalStorage(
    setWallets,
    setWallet,
    setBlocks,
    setTransactions,
    setTempTransactions,
    wallet,
    wallets,
    blocks,
    transactions,
    tempTransactions
  );

  return (
    <div className=" w-full min-h-screen h-full">
      <Header wallet={wallet} />
      <div className=" h-full bg-black w-full">
        <div className="flex flex-row w-full h-full justify-between">
          <Component
            {...pageProps}
            wallets={wallets}
            setWallets={setWallets}
            blocks={blocks}
            setBlocks={setBlocks}
            transactions={transactions}
            setTransactions={setTransactions}
            wallet={wallet}
            setWallet={setWallet}
            tempTransactions={tempTransactions}
            setTempTransactions={setTempTransactions}
          />
          <div className="flex flex-row  w-fit h-full">
            {WalletsList(wallets, wallet, setWallet)}
            {/* {BlockDisplay(blockz)} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyApp;
