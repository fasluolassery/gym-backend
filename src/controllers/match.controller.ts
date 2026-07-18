import { Request, Response } from 'express';
import { matchRepository } from '../repositories/match.repository';
import { mapMatchToDTO } from '../dtos/match.dto';
import { updateMatchScoreSchema } from '../validators/match.validator';
import { NotFoundError, BadRequestError } from '../errors';
import { IMatch } from '../models/match.model';

export class MatchController {
  getAll = async (req: Request, res: Response) => {
    const matches = await matchRepository.findAll();
    return res.status(200).json(matches.map(mapMatchToDTO));
  };

  getById = async (req: Request, res: Response) => {
    const match = await matchRepository.findById(req.params.id as string);
    if (!match) {
      throw new NotFoundError('Match not found');
    }
    return res.status(200).json(mapMatchToDTO(match));
  };

  updateScore = async (req: Request, res: Response) => {
    const validationResult = updateMatchScoreSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new BadRequestError(validationResult.error.issues[0]?.message || 'Validation failed');
    }
    const updateData: Partial<IMatch> = {
      homeScore: validationResult.data.homeScore,
      awayScore: validationResult.data.awayScore,
      isCompleted: validationResult.data.isCompleted,
    };

    const match = await matchRepository.update(req.params.id as string, updateData);
    if (!match) {
      throw new NotFoundError('Match not found');
    }
    return res.status(200).json(mapMatchToDTO(match));
  };

  // Sync / Bulk Save matches
  sync = async (req: Request, res: Response) => {
    if (!Array.isArray(req.body)) {
      throw new BadRequestError('Request body must be an array of matches');
    }

    await matchRepository.deleteMany({});

    const saved = [];
    for (const m of req.body) {
      const match = await matchRepository.create({
        id: m.id,
        round: m.round,
        homeTeamId: m.homeTeamId,
        awayTeamId: m.awayTeamId,
        homeScore: m.homeScore ?? null,
        awayScore: m.awayScore ?? null,
        isCompleted: m.isCompleted,
      } as unknown as Partial<IMatch>);
      saved.push(mapMatchToDTO(match));
    }
    return res.status(200).json(saved);
  };
}

export const matchController = new MatchController();
