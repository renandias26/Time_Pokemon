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

    public async ListAllPokemonsTypes(req: Request, res: Response){
        const Type = await PokemonService.ListPokemonTypes()
        return res.send(Type)
    }
    public async FindPokemonByType(req: Request, res: Response){
        const Pokemon = await PokemonService.FindPokemonByType(req.body.type)
        return res.send(Pokemon)
    }

    public async FindPokemonByDexNumber(req: Request, res: Response){
        const Pokemon = await PokemonService.FindPokemonByDexNumber(req.body.DexNumber)
        return res.send(Pokemon)
    }

    public async FindPokemonByName(req: Request, res: Response){
        const Pokemon = await PokemonService.FindPokemonByName(req.body.names)
        return res.send(Pokemon)
    }

}

export default new PokemonController()