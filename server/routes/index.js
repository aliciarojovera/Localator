module.exports = app => {

    // Base URLS
    app.use('/api/localator', require('./localator.routes'))
    app.use('/api', require('./auth.routes'))
    app.use('/api/local', require('./localator.routes'))


}