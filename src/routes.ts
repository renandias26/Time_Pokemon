import { Router } from 'express'
import PokemonController from './Pokemon/Pokemon.controller'
import TeamController from './Team/Team.controller'


const Routes = Router()

Routes.get('', PokemonController.HelloWord)
Routes.post('/SaveAllPokemons', PokemonController.SaveAllPokemons)
Routes.post('/FindAllPokemonsType', PokemonController.ListAllPokemonsTypes) //corrigir
Routes.get('/FindPokemonsByType', PokemonController.FindPokemonByType)
Routes.get('/FindPokemonByDexNumber', PokemonController.FindPokemonByDexNumber)
Routes.get('/FindPokemonByName', PokemonController.FindPokemonByName)

Routes.post('/CreateTeam', TeamController.CreateTeam)
Routes.get('/FindAllTeams', TeamController.FindAllTeams)
Routes.get('/FindTeamByTrainer', TeamController.FindTeamByTrainer)
Routes.put('/EditTeamByTrainer', TeamController.EditTeamByTrainer)
Routes.delete('/DeleteTeamByTrainer', TeamController.DeleteTeamByTrainer)

export default Routes