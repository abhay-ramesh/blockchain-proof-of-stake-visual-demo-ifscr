import { Wallet } from "../types/main";

export function WalletsList(wallets: Wallet[], wallet: Wallet, setWallet: any) {
  return (
    <div className=" space-y-1 bg-black overflow-y-scroll text-white">
      {wallets.map((wallt) => {
        return (
          <div
            className={
              " py-4 bg-zinc-700 px-6 " +
              (wallet.address == wallt.address &&
                " border-l-4 border-l-lime-400")
            }
          >
            <div className="flex flex-row items-center w-full">
              <div
                className=" cursor-pointer bg-zinc-600 py-1 px-2 rounded-md w-full flex flex-row justify-between items-center space-x-2"
                onClick={() => {
                  navigator.clipboard.writeText(wallt.address);
                }}
              >
                <text>{wallt.address}</text>
                <i className="icon  icon-copy"></i>
              </div>
              {wallt.is_validator && (
                <text className=" justify-self-end p-1"> ✅</text>
              )}
            </div>
            <div>Balance: {wallt.balance} ETH</div>
            <button
              type="button"
              className={
                " py-1  rounded-md mt-2 px-4 w-full " +
                (wallet.address == wallt.address
                  ? " bg-lime-400 text-gray-600 "
                  : " bg-slate-800 ")
              }
              onClick={() => {
                setWallet(wallt);
              }}
            >
              {wallet.address == wallt.address ? "Selected" : "Select"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
