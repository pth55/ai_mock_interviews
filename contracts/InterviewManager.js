import Web3 from "web3";
import contractABI from "./ABI"; // ABI for your InterviewManager contract
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

let web3;
let contract;

export async function connectToBlockchain() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    alert("Please install MetaMask!");
  }
}

// Add a record to created_interviews
export async function addCreatedInterview(uid, name, email) {
  const accounts = await web3.eth.getAccounts();
  try {
    await contract.methods
      .addCreatedInterview(uid, name, email)
      .send({ from: accounts[0] });
    alert("Created Interview record added successfully.");
  } catch (error) {
    console.error("Error adding created interview:", error);
    alert("Failed to add created interview record.");
  }
}

// Add a record to attended_interviews
export async function addAttendedInterview(uid, name, email) {
  const accounts = await web3.eth.getAccounts();
  try {
    await contract.methods
      .addAttendedInterview(uid, name, email)
      .send({ from: accounts[0] });
    alert("Attended Interview record added successfully.");
  } catch (error) {
    console.error("Error adding attended interview:", error);
    alert("Failed to add attended interview record.");
  }
}

// Fetch all records from created_interviews
export async function getCreatedInterviews() {
  try {
    const records = await contract.methods.getCreatedInterviews().call();
    console.log("Created Interviews:", records);
    return records;
  } catch (error) {
    console.error("Error fetching created interviews:", error);
    alert("Failed to fetch created interviews.");
  }
}

// Fetch all records from attended_interviews
export async function getAttendedInterviews() {
  try {
    const records = await contract.methods.getAttendedInterviews().call();
    console.log("Attended Interviews:", records);
    return records;
  } catch (error) {
    console.error("Error fetching attended interviews:", error);
    alert("Failed to fetch attended interviews.");
  }
}

// Fetch records for a given uid from both arrays
export async function getInterviewsByUserId(uid) {
  try {
    // This method returns a tuple of arrays: (created, attended)
    const result = await contract.methods.getInterviewsByUserId(uid).call();
    console.log(`Interviews for user ${uid}:`, result);
    return result;
  } catch (error) {
    console.error("Error fetching interviews by user id:", error);
    alert(`Failed to fetch interviews for user id: ${uid}`);
  }
}
