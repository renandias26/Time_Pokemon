import { Router } from 'express'
import PokemonDataController from './PokemonData/PokemonData.controller'


const Routes = Router()

Routes.get('', PokemonDataController.HelloWord)

export default Routes