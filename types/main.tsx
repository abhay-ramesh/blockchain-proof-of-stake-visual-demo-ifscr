export interface Wallet {
  address: string;
  private_key: string;
  balance: number;
  is_validator: boolean;
  staked: Number;
}

export interface Block {
  block_id: Number;
  block_hash: String;
  status: String;
  transactions: Transaction[];
}

export interface Transaction {
  transaction_hash: String;
  from_address: String;
  to_address: String;
  is_pending: Boolean;
  amount: Number;
  gas_fees: Number;
  block_id?: Number;
  validator: String;
  status: String;
  slashed?: {
    validator?: String;
    amount?: Number;
  };
}
