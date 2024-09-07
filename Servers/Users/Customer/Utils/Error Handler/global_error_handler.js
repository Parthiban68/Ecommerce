const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");
const { error } = require("winston");
const { ValidationError, AuthorizeError, NotFoundError } = require("./customize_errors");

Sentry.init({
    dsn: "https://1cb1d96e2cea4d08bafecaa7d3361439@o4507844172185600.ingest.de.sentry.io/4507844177559632",
    integrations: [
        nodeProfilingIntegration(),
    ],

    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
});


module.exports = (app) => {
    app.use((error, req, res, next) => {
        let errorReport = false;

        [ValidationError, AuthorizeError, NotFoundError].forEach((typeofError) => {
            if (error instanceof typeofError) {
                errorReport = true;
            }
        })

        if (errorReport) {
            Sentry.captureException(error);
        }

        const statusCode = error.statusCode || 500;
        const data = error.message || error.data;
        return res.status(statusCode).json(data);
    })

}