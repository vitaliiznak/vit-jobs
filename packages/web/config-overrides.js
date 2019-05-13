const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),

    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            javascriptEnabled: true,
            'ant-theme-file': "./ant-variables-override.less",
            '@layout-header-background': '#001529'
        },
    }),
);