const apiKey = process.env.NEXT_PUBLIC__ETHERSCAN_API_KEY || "YKPE2D1J4Q3VWYD1TPHXDVXIYKMYWCA8YP";

export async function getContractABI(contractAddress: string) {
        try {
            const response = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`);
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