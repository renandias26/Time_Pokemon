import { Router } from 'express'
import PokemonController from './Pokemon/Pokemon.controller'


const Routes = Router()

Routes.get('', PokemonController.HelloWord)
Routes.get('/saveAllPokemons', PokemonController.SaveAllPokemons)

export default Routes