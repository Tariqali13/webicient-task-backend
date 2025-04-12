/* default.js, node-config default configuration.

   All application configuration variables should be represented herein, even
   if only to have default or empty value.

   If you would like to change any of these values for your dev environment, create
   a local.js file in this directory (which will be gitignored), in which individual
   properties can be specified which overwrite any of the values below.

*/

module.exports = {
    dataSource: {
        databaseUrl: fromEnv('MONGODB_URL', 'mongodb+srv://webicient:webicient%40123@cluster0.hmdttbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    },
    serve: {
        port: process.env.PORT || 3500,
    },
    expressSessionSecret: fromEnv('EXPRESS_SESSION_SECRET', 'AJSDFAS09DFUAS09DF8A0S9DF'),
};

// In production environments, read from the environment. Otherwise, use a
// default for development, allowing the value to be overridden.
function identity(x) {
    return x;
}

// Read from the environment, or use a default.
function fromEnv(varName, defValue, transform) {
    transform = transform || identity;
    const envValue = process.env[varName];
    if (envValue !== undefined) {
        return transform(envValue);
    }
    return defValue;
}