import { Request, Response } from 'express';
import { teamRepository } from '../repositories/team.repository';
import { mapTeamToDTO } from '../dtos/team.dto';
import { updateTeamSchema } from '../validators/team.validator';
import { NotFoundError, BadRequestError } from '../errors';
import { ITeam } from '../models/team.model';
import { uploadToCloudinary } from '../utils/cloudinary';

export class TeamController {
  getAll = async (req: Request, res: Response) => {
    const teams = await teamRepository.findAll();
    return res.status(200).json(teams.map(mapTeamToDTO));
  };

  getById = async (req: Request, res: Response) => {
    const team = await teamRepository.findById(req.params.id as string);
    if (!team) {
      throw new NotFoundError('Team not found');
    }
    return res.status(200).json(mapTeamToDTO(team));
  };

  update = async (req: Request, res: Response) => {
    const validationResult = updateTeamSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new BadRequestError(validationResult.error.issues[0]?.message || 'Validation failed');
    }
    const updateData: Partial<ITeam> = {};
    if (validationResult.data.name !== undefined) updateData.name = validationResult.data.name;
    if (validationResult.data.manager !== undefined)
      updateData.manager = validationResult.data.manager;
    if (validationResult.data.averageRating !== undefined)
      updateData.averageRating = validationResult.data.averageRating;
    if (validationResult.data.logo !== undefined) {
      updateData.logo = await uploadToCloudinary(validationResult.data.logo, 'teams');
    }
    if (validationResult.data.managerAvatar !== undefined) {
      updateData.managerAvatar = await uploadToCloudinary(
        validationResult.data.managerAvatar,
        'managers'
      );
    }

    const team = await teamRepository.update(req.params.id as string, updateData);
    if (!team) {
      throw new NotFoundError('Team not found');
    }
    return res.status(200).json(mapTeamToDTO(team));
  };

  // Sync / Bulk Save teams
  sync = async (req: Request, res: Response) => {
    if (!Array.isArray(req.body)) {
      throw new BadRequestError('Request body must be an array of teams');
    }

    await teamRepository.deleteMany({});

    const saved = [];
    for (const t of req.body) {
      const logoUrl = await uploadToCloudinary(t.logo, 'teams');
      const managerAvatarUrl = await uploadToCloudinary(t.managerAvatar, 'managers');
      const team = await teamRepository.create({
        id: t.id,
        name: t.name,
        manager: t.manager,
        averageRating: t.averageRating || 0,
        logo: logoUrl,
        managerAvatar: managerAvatarUrl,
      } as unknown as Partial<ITeam>);
      saved.push(mapTeamToDTO(team));
    }
    return res.status(200).json(saved);
  };
}

export const teamController = new TeamController();
