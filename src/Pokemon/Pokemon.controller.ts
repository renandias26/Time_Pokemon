import { Request, Response } from "express";
import PokemonService from  './Pokemon.service'

class PokemonController{
    public HelloWord(req: Request, res: Response){
        const Hello = PokemonService.HelloWord()
        return res.send(Hello)
    }

    public async SaveAllPokemons(req: Request, res: Response){
        const Pokemon = await PokemonService.SaveAllPokemons()
        return res.send(Pokemon)
    }
}

export default new PokemonController()