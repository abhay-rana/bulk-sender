import { Button } from 'antd';
import {
    GithubOutlined,
    TwitterOutlined,
    YoutubeOutlined,
    RedditOutlined,
} from '@ant-design/icons';

const Header = () => {
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
            <Button
                type="primary"
                size="large"
                className="bg-blue-500 hover:bg-blue-600"
            >
                Connect Wallet
            </Button>
        </div>
    );
};

export default Header;
