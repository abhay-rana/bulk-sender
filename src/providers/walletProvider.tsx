import { createAppKit } from '@reown/appkit'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, arbitrum, polygon } from '@reown/appkit/networks'

const projectId = 'd941a77bdf4110394d127dd3e0a92be0'

const metadata = {
    name: 'Bulk Sender',
    description: 'Bulk Sender',
    url: 'https://mywebsite.com',
    icons: ['https://avatars.mywebsite.com/']
}

export const initializeReOwn = () => {
    createAppKit({
        adapters: [new EthersAdapter()],
        networks: [mainnet, polygon],
        metadata,
        projectId,
        features: {
            analytics: true
        }
    })
}
