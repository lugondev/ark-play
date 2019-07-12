export interface ContestSubmission {
  id: string;
  amount: string;
  sender: string;
  vendorField: string;
  timestamp: number;
}

export interface apiResponse {
  id: string;
  blockId: string;
  version: number;
  type: number;
  amount: string;
  fee: string;
  sender: string;
  senderPublicKey: string;
  recipient: string;
  signature: string;
  vendorField: string;
  confirmations: number;
  timestamp: {
    epoch: number;
    unix: number;
    himan: string;
  };
}
