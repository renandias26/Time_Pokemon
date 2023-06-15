import { Schema, model } from "mongoose";
import { PokemonStatus } from "./Types/Pokemon.types";

const PokemonSchema = new Schema({
    Name:{
        type: String,
        require: true
    },
    Types: {
        type: Array<String>,
        require: true
    },
    Status: {
        type: Array<PokemonStatus>,
        require: true
    },
    Dex: {
        type: Number,
        require: true
    },
    Height: {
        type: Number,
        require: true
    },
    Weight: {
        type: Number,
        require: true
    },
    Moves: {
        type: Array<String>,
        require: true
    }
}, {timestamps: true})

export default model('PokemonSchema', PokemonSchema)