const API_KEY = 'iUoiscmfWwgn-6WiWEWtFw7wyvI1Dpbs';
import { getApi } from '~/services/api-services';

// interfaces

export interface ContractMetadata {
    address: string;
    name: string | null;
    symbol: string | null;
    totalSupply: number | null;
    tokenType: string;
    contractDeployer: string | null;
    deployedBlockNumber: number | null;
    openSeaMetadata: {
      floorPrice: number | null;
      collectionName: string | null;
      collectionSlug: string | null;
      safelistRequestStatus: string | null;
      imageUrl: string | null;
      description: string | null;
      externalUrl: string | null;
      twitterUsername: string | null;
      discordUrl: string | null;
      bannerImageUrl: string | null;
      lastIngestedAt: string; // ISO date string
    };
}

// function 
export const getContractMetadata = async (chain: string, contractAddress: string) : Promise<ContractMetadata | null | undefined> => {
    try {
        if (!contractAddress) return null;
        console.log({ API_KEY })
        const url = `https://${chain}.g.alchemy.com/nft/v3/${API_KEY}/getContractMetadata?contractAddress=${contractAddress}`
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        // const res = await fetch(url, options)
        const res = await getApi(url);
        console.log({res})
        // const json = await res.json()
        return res.data;
    } catch (err) {
        console.log({ err })
        throw new Error(JSON.stringify(err));
    }
}