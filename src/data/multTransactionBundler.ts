import { ETHERSCAN_API_KEY } from "~/env";

export async function getContractABI(contractAddress: string) {
        try {
            const response = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${ETHERSCAN_API_KEY}`);
            const data = await response.json();

            if (data.status === "1") {
                return JSON.parse(data.result);
            } else {
                throw new Error(data.message || "Failed to retrieve ABI");
            }
        } catch (error) {
            console.error("Error fetching ABI:", error);
            throw error;
        }
}