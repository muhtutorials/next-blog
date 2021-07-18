const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = phase => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            // development variables
            env: {
                dbUsername: 'igor',
                dbPassword: 'spellbound',
                dbCluster: 'cluster0',
                dbName: 'blog'
            }
        }
    }

    return {
        // production variables
        env: {
            dbUsername: 'igor',
            dbPassword: 'spellbound',
            dbCluster: 'cluster0',
            dbName: 'blog'
        }
    }
};