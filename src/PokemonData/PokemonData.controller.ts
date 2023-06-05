import { Request, Response } from "express";
import PokemonDataService from  './PokemonData.service'

class PokemonDataController{
    public HelloWord(req: Request, res: Response){
        const Hello = PokemonDataService.HelloWord()
        return res.send(Hello)
    }
}

export default new PokemonDataController()