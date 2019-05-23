module.exports = function (config) {
    config.set({

        basePath: '',

        autoWatch: true,

        files: [
            {pattern: "src/**/*.ts"}
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        frameworks: ['jasmine', 'karma-typescript'],

        browsers: ['ChromeHeadless'],

        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    '--no-sandbox',
                    '--remote-debugging-port=9222'
                ]
            }
        },

        reporters: ['progress', 'karma-typescript'],

        karmaTypescriptConfig: {
            coverageOptions: {
                threshold: {
                    global: {
                        statements: 100,
                        branches: 100,
                        functions: 100,
                        lines: 100,
                        excludes: [
                            "src/**/pending-event.ts"
                        ]
                    }
                }
            }
        },

        plugins: [
            require('karma-chrome-launcher'),
            require('karma-jasmine'),
            require('karma-typescript')
        ]

    });
};