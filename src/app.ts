import Express from 'express'
import Mongoose from 'mongoose'
import Routes from './routes'

class app{
    public ExpressApplication: Express.Application

    constructor(){
        this.ExpressApplication = Express()

        this.Middleware()
        this.Router()
        this.Database()
    }

    private Middleware(){
        this.ExpressApplication.use(Express.json())
    }

    private Router(){
        this.ExpressApplication.use(Routes)
    }

    private async Database(){
        try{
            Mongoose.set('strictQuery', true)
            await Mongoose.connect('mongodb://0.0.0.0:27017/TeamPokemon')
            console.log('Database connected')
        }catch(err){
            console.log('Database not connected: ', err)
        }
    }
}

export default new app().ExpressApplication