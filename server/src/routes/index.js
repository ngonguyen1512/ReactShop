import authRouter from './auth'
import userRouter from './user'
import menuRouter from './menu'
import stateRouter from './state'
import functionRouter from './function'
import transferRouter from './transfer'
import categoryRouter from './category'
import uplodaImageRouter from './uplodaImage'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/menu', menuRouter)
    app.use('/api/v1/state', stateRouter)
    app.use('/api/v1/function', functionRouter)
    app.use('/api/v1/transfer', transferRouter)
    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/image', uplodaImageRouter)

    return app.use('/', (req, res) => {
        res.send('Server on...');
    })
}

export default initRoutes;