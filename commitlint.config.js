module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'header-max-length': [2, 'always', 72], // header max chars 72
        'subject-case': [2, 'always', 'lower-case'], // lower-case subject
        'body-leading-blank': [2, 'always'], // blank line between header and body
        'body-max-line-length': [2, 'always', 80], // body lines max chars 80
        'footer-leading-blank': [2, 'always'], // blank line between body and footer
        'footer-max-line-length': [2, 'always', 80], // footer lines max chars 80
        'type-enum': [
            2,
            'always',
            [
                'feat', // New feature
                'perf', // Improves performance
                'fix', // Bug fix
                'rever', // Revert to a previous commit in history
                'style', // Do not affect the meaning of the code (formatting, etc)
                'refac', // Neither fixes a bug or adds a feature
                'test', // Adding missing tests or correcting existing tests
                'docs', // Changes in documentation
                'chore', // Changes the build process
            ],
        ],
        'scope-enum': [
            2,
            'always',
            [
                'infra', // Infrastructure change
                'conf', // Configuration files change
                'build', // System component change (ci, scons, webpack...)
                'job', // asynchronous or schedule tasks (backups, maintainance...)
                'cross', // Mix of two or more scopes
                'doc', // Documentation only changes
                'deps-dev', // Changes in dev dependencies,
                'deps', // Changes in dependencies,
            ],
        ],
    },
};
