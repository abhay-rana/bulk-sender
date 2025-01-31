import { ConfigProvider } from 'antd';
import { useTheme } from '~/hooks';

const antdLightTheme = {
    components: {
        Select: {
            colorTextPlaceholder: 'black',
            optionPadding: '2px 10px',
            optionFontSize: '11px',
            colorText: 'black',
            optionSelectedBg: '#EEF2FE'
        },
        Form: {
            colorText: 'black',
            colorIcon: 'black',
        },
        Modal: {
            titleFontSize: 18,
        },
    },
};

const antdDarkTheme = {
    components: {
        Select: {
            colorTextPlaceholder: 'white',
            optionPadding: '2px 10px',
            optionFontSize: '11px',
            colorText: '#ffffff',
            optionSelectedBg: '#282A2C'
        },
        Form: {
            colorText: '#ffffff',
            labelColor: '#f5f6f6'
        },
        Modal: {
            contentBg: '#191B1C',
            headerBg: '#191B1C',
            titleColor: '#F5F6F6',
            titleFontSize: 18,
        },
        Input: {
            activeBorderColor: 'grey',
            hoverBorderColor: 'grey',
        },
        Button: {
            defaultBg: '#282A2C',
            defaultHoverBg: '#282A2C',
        }
    },
};

const AntdThemeProvider = ({ children }) => {
    const { theme } = useTheme();

    const themeConfig = theme === 'light' ? antdLightTheme : antdDarkTheme;
    console.log({ theme, themeConfig });

    return (
        <>
            <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
        </>
    );
};

export default AntdThemeProvider;
