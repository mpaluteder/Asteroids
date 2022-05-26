module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'parser': '@babel/eslint-parser',
    'parserOptions': {
        'ecmaVersion': 2018,
        'requireConfigFile': false,
        'sourceType': 'module'
    },
    'plugins': [
        'babel',
    ],
    'ignorePatterns': ['/build/*'],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always',
            { 'omitLastInOneLineBlock': true }
        ],
        'comma-dangle': [
            'error',
            'only-multiline'
        ],
        'no-unreachable': [
            'error'
        ]
    }
};