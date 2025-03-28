"use client";

import { useState } from "react";
import { connectToBlockchain } from "@/lib/InterviewManager"; // adjust the path if needed

export default function WalletConnectButton() {
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnect = async () => {
    await connectToBlockchain();
    // Retrieve accounts from window.ethereum after connecting
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      setWalletAddress(accounts[0]);
    }
  };

  // Function to shorten the address, e.g., "0x1234...abcd"
  const shortenAddress = (address) =>
    address
      ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      : "";

  return (
    <button
      onClick={handleConnect}
      className="relative px-4 py-2 bg-blue-600 text-white rounded transition-all hover:bg-blue-700 focus:outline-none"
    >
      {walletAddress ? (
        <span className="animate-pulse">{shortenAddress(walletAddress)}</span>
      ) : (
        "Connect Wallet"
      )}
    </button>
  );
}
