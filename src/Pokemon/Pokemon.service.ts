import PokemonSchema from "./Pokemon.schema"
import { PokemonStatus, Pokemon } from "./Types/Pokemon.types"
import {writeFile, readFile} from 'fs/promises'
import { PokemonTypeDTO, PokemonNameDexNumber } from "./Types/PokemonTypes.dto"

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

    public async ListPokemonTypes(){
        const strPokemons = await readFile('pokemons.json', 'utf-8')
        const arrPokemons: Pokemon[] = JSON.parse(strPokemons)

        const arrTypes: PokemonTypeDTO[] = new Array<PokemonTypeDTO>

        arrPokemons.forEach((pokemon)=>{
            pokemon.Types.forEach((NameType)=>{
                if (arrTypes.some((TypeDto)=>{ return TypeDto.Type == NameType})){
                    const Type = arrTypes.find((TypeDto)=>{return TypeDto.Type == NameType})
                    if(!Type){return}         
                    Type.Pokemons.push({Name: pokemon.Name, DexNumber: pokemon.Dex})
                    return
                }
                const arr = new Array<PokemonNameDexNumber>
                arr.push({
                    Name: pokemon.Name, 
                    DexNumber: pokemon.Dex
                })
                arrTypes.push({Type: NameType, Pokemons: arr})
            })
        })

        arrTypes.forEach((item)=>{
            return item.Pokemons.sort((Pokemon)=>{
                return Pokemon.DexNumber
            })
        })

        await writeFile('ListPokemonTypes.json', JSON.stringify(arrTypes, null, 2))
    }

    public async FindPokemonByType(PokemonType: string){
        return await PokemonSchema.find({Types: {$in: PokemonType}})
    }

    public async FindPokemonByDexNumber(DexNumber: number){
        return await PokemonSchema.find({Dex: DexNumber})
    }

    public async FindPokemonByName(Name: string[]){   
        return await PokemonSchema.find({Name: {$in: Name}}) 
    }

}

export default new PokemonService()