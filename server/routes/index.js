module.exports = app => {

    // Base URLS
    app.use('/api/localator', require('./localator.routes'))
    app.use('/api', require('./auth.routes'))
    app.use('/api/local', require('./localator.routes'))
    app.use('/api/books', require('./book.routes'))
    app.use('/api/profile', require('./profile.routes'))
}