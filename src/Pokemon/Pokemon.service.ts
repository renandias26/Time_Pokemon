import PokemonSchema from "./Pokemon.schema"
import { PokemonStatus, Pokemon } from "./Types/Pokemon.types"
import {writeFile} from 'fs/promises'

class PokemonService{
    public HelloWord(){
        return 'Hello Word'
    }
    public async SaveAllPokemons(){   
        const arrPokemon = await this.GetAllPokemons()
        const File = await writeFile('Pokemons.json', JSON.stringify(arrPokemon, null, 2))
        const PokemonDocument = await PokemonSchema.insertMany(arrPokemon)
        return {
            File: File,
            PokemonDocument: PokemonDocument
        }
    }

    private async GetAllPokemons(){
        const PokemonsURL = await this.GetPokemonsUrl()
        const arrPromisePokemon = PokemonsURL.map(async (url)=>{
            const ResponsePokemon = await fetch(url)
            const Pokemon: Pokemon = await ResponsePokemon.json().then((PokemonData)=>{
                const Data: Pokemon = {
                    Name: PokemonData.name,
                    Types: this.GetPokemonTypes(PokemonData.types),
                    Status: this.GetPokemonStatus(PokemonData.stats),
                    Dex: PokemonData.game_indices[9].game_index,
                    Height: PokemonData.height,
                    Weight: PokemonData.weight,
                    Moves: this.GetPokemonMoves(PokemonData.moves, 4)
                }
                return Data
            })
            return Pokemon
        })
        const ArrPokemon = await Promise.all(arrPromisePokemon)
        return ArrPokemon
    }

    private async GetPokemonsUrl(){
        const ResponsePokemon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        
        const PokemonsUrl: string[] = await ResponsePokemon.json().then((item)=>{
            return item.results.map((pokemon)=>{
                return pokemon.url
            })
        })

        return PokemonsUrl
    }

    private GetPokemonTypes(Types: any){
        const TypesName: string[] = Types.map((item)=>{
            return item.type.name
        })

        return TypesName
    }

    private GetPokemonStatus(Status: any){
        const arrStatus: PokemonStatus[] = Status.map((item)=>{
            const status: PokemonStatus = {
                Name: item.stat.name,
                Value: item.base_stat
            }
            return status
        })

        return arrStatus
    }

    private GetPokemonMoves(Moves: any, Quantity: number){
        let arrMoves: string[] = new Array<string>
        const arrMovesSize = Moves.length > Quantity ? Quantity : Moves.length

        while(arrMoves.length < arrMovesSize){
            const RandomIndex = this.RandomIndex(Moves.length)
            arrMoves.push(Moves[RandomIndex].move.name)
        }

        return arrMoves
    }

    private RandomIndex(arrlength: number){
        return Math.floor(Math.random() * (arrlength-1))
    }
}

export default new PokemonService()