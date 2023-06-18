import { Pokemon } from "src/Pokemon/Types/Pokemon.types";
import { Team } from "./Types/Team.types";
import PokemonService from "../Pokemon/Pokemon.service";
import TeamSchema from "./Team.schema";

class TeamService{
    public async CreatePokemonTeam(PokemonTeam: Team){
        return await TeamSchema.create(PokemonTeam)
    }

    public async FindAllTeams(){
        return await TeamSchema.find()
    }

    public async FindTeamByTrainer(Trainer: string){
        return await TeamSchema.find({TrainerName: Trainer})
    }

    public async EditTeamByTrainer(PokemonTeam: Team){
        return await TeamSchema.findOneAndUpdate({TrainerName: PokemonTeam.Trainer}, {Team: PokemonTeam.Team})
    }

    public async DeleteTeamByTrainer(Trainer: string){
        return await TeamSchema.findOneAndDelete({TrainerName: Trainer})
    }

    public
}

export default new TeamService()