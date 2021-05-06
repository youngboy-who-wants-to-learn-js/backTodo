module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint', 'prettier'],
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    env: {
        browser: true,
        jasmine: true,
        jest: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
    },
    rules: {
        // Include .prettierrc.js rules
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        // We will use TypeScript's types for component props instead
        'react/prop-types': 'off',
        // We don't want unused vars
        '@typescript-eslint/no-unused-vars': ['error'],
        'import/no-cycle': 'off',
        'no-console': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'import/newline-after-import': 'off',
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
        'jsx-a11y/label-has-for': [
            'error',
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
    },
};
