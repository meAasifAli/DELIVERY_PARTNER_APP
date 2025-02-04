const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
    ...defaultConfig,
    transformer: {
        ...defaultConfig.transformer,
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        ...defaultConfig.resolver,
        assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'), // Remove .svg from assets
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'], // Treat .svg as source file
    },
    server: {
        port: 8085, // Your custom port
    },
};

module.exports = mergeConfig(defaultConfig, config);
