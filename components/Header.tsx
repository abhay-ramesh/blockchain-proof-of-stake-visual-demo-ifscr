import { Wallet } from "../types/main";

export interface HeaderProps {
  wallet: Wallet;
}
export const Header = ({ wallet }: HeaderProps) => {
  return (
    <>
      <div className=" bg-zinc-600 text-white ">
        <div className="flex justify-between p-4 container mx-auto ">
          <div className="flex space-x-4 text-md ">
            {/* <Link href="/"> */}
            <a
              href="/"
              className=" hover:border-b-[2.5px] hover:border-b-lime-400 "
            >
              Account
            </a>
            {/* </Link> */}
            {/* <Link href="/validator"> */}
            <a
              href="/validator"
              className=" hover:border-b-[2.5px] hover:border-b-lime-400 "
            >
              Validator
            </a>
            {/* </Link> */}
            {/* <Link href="/blockchain"> */}
            <a
              href="/blockchain"
              className=" hover:border-b-[2.5px] hover:border-b-lime-400 "
            >
              Blockchain
            </a>
            {/* </Link> */}
            {/* <Link href="/create"> */}
            <a
              href="/create"
              className=" bg-black text-white px-2 rounded hover:px-3 hover:shadow-md"
            >
              {" "}
              +{" "}
            </a>
            {/* </Link> */}
          </div>
          <div className=" flex space-x-6">
            <div>{`Staked: ${wallet.staked.toFixed(2)} ETH`}</div>
            <div>Balance: {wallet.balance} ETH</div>
            <div>Address: {wallet.address}</div>
            <div>{wallet.is_validator ? "✅" : ""}</div>
          </div>
        </div>
      </div>
    </>
  );
};
