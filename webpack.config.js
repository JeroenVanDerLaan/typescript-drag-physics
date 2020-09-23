module.exports = (env, argv) => {
    return {
        mode: 'production',
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.ts$/i,
                    use: [
                        'ts-loader'
                    ],
                },
                {
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                },
            ],
        },
        resolve: {
            extensions: [
                '.js',
                '.ts',
                '.css'
            ],
        },
    }
};