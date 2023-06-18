import { Pokemon } from "src/Pokemon/Types/Pokemon.types";
import { Schema, model } from "mongoose";
import PokemonSchema from "../Pokemon/Pokemon.schema";

const TeamSchema = new Schema({
    TrainerName: {
        type: String,
        require: true
    },
    Team: [
        {Name: String}
    ]
}, {timestamps: true})

export default model('Team', TeamSchema)