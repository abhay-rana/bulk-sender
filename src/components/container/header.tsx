import { Button, Select } from 'antd';
import {
    GithubOutlined,
    TwitterOutlined,
    YoutubeOutlined,
    RedditOutlined,
} from '@ant-design/icons';
import { BLOCKCHAIN_OPTIONS } from '~/constants/blockchain-metdata';

const Header = () => {
    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    return (
        <div className="flex h-24 flex-row items-center justify-between bg-gray-900 px-8">
            {/* Social Media Links */}
            <div className="flex gap-6">
                <a href="#" className="text-2xl text-white hover:text-blue-400">
                    <TwitterOutlined />
                </a>
                <a href="#" className="text-2xl text-white hover:text-red-500">
                    <YoutubeOutlined />
                </a>
                <a
                    href="#"
                    className="text-2xl text-white hover:text-orange-500"
                >
                    <RedditOutlined />
                </a>
                <a
                    href="#"
                    className="text-2xl text-white hover:text-purple-400"
                >
                    <GithubOutlined />
                </a>
            </div>

            {/* Logo */}
            <div className="text-2xl font-bold text-white">Bulk Sender</div>

            {/* Connect Wallet Button */}
            <div className="flex flex-row items-center gap-3">
                <Select
                    showSearch
                    placeholder="Select Chain"
                    size="large"
                    optionFilterProp="label"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={BLOCKCHAIN_OPTIONS.map(
                        ({ value, label, icon }) => ({
                            value,
                            label: (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    <img
                                        src={icon}
                                        alt={label}
                                        width="20"
                                        height="20"
                                        style={{ borderRadius: '50%' }}
                                    />
                                    {label}
                                </div>
                            ),
                        })
                    )}
                />
                <Button
                    type="primary"
                    size="large"
                    className="bg-blue-500 hover:bg-blue-600"
                >
                    Connect Wallet
                </Button>
            </div>
        </div>
    );
};

export default Header;
