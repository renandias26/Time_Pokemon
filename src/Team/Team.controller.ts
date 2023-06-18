import TeamService from "./Team.service";
import { Request, Response } from "express";

class TeamController{
    public async CreateTeam (req: Request, res: Response){
        const Team = await TeamService.CreatePokemonTeam(req.body)
        return res.send(Team)
    }

    public async FindAllTeams(req: Request, res: Response){
        const arrTeam = await TeamService.FindAllTeams()
        return res.send(arrTeam)
    }

    public async FindTeamByTrainer(req: Request, res: Response){
        const Team = await TeamService.FindTeamByTrainer(req.body.TrainerName)
        res.send(Team)
    }

    public async EditTeamByTrainer(req: Request, res: Response){
        const UpdateTeam = await TeamService.EditTeamByTrainer(req.body.TrainerName)
        return res.send(UpdateTeam)
    }

    public async DeleteTeamByTrainer(req: Request, res: Response){
        const DeletedTeam = await TeamService.DeleteTeamByTrainer(req.body.TrainerName)
        return res.send(DeletedTeam)
    }
}

export default new TeamController()