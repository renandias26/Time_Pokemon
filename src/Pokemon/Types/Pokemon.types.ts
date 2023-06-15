export interface Pokemon{
    Name: string,
    Types: string[],
    Status: PokemonStatus[],
    Dex: number,
    Height: number,
    Weight: number,
    Moves: string[]
}

export interface PokemonStatus{
    Name: string,
    Value: number
}