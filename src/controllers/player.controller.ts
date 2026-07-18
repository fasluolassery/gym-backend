import { Request, Response } from 'express';
import { playerRepository } from '../repositories/player.repository';
import { mapPlayerToDTO } from '../dtos/player.dto';
import { createPlayerSchema, updatePlayerSchema } from '../validators/player.validator';
import { NotFoundError, BadRequestError } from '../errors';
import { IPlayer } from '../models/player.model';
import { uploadToCloudinary } from '../utils/cloudinary';

export class PlayerController {
  getAll = async (req: Request, res: Response) => {
    const players = await playerRepository.findAll();
    return res.status(200).json(players.map(mapPlayerToDTO));
  };

  getById = async (req: Request, res: Response) => {
    const player = await playerRepository.findById(req.params.id as string);
    if (!player) {
      throw new NotFoundError('Player not found');
    }
    return res.status(200).json(mapPlayerToDTO(player));
  };

  create = async (req: Request, res: Response) => {
    const validationResult = createPlayerSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new BadRequestError(validationResult.error.issues[0]?.message || 'Validation failed');
    }
    const id = req.body.id || Date.now().toString();
    const avatarUrl = await uploadToCloudinary(validationResult.data.avatar, 'avatars');
    const player = await playerRepository.create({
      id,
      name: validationResult.data.name,
      position: validationResult.data.position,
      rating: validationResult.data.rating,
      teamId: validationResult.data.teamId ?? null,
      avatar: avatarUrl,
      phone: validationResult.data.phone ?? null,
    } as unknown as Partial<IPlayer>);
    return res.status(201).json(mapPlayerToDTO(player));
  };

  update = async (req: Request, res: Response) => {
    const validationResult = updatePlayerSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new BadRequestError(validationResult.error.issues[0]?.message || 'Validation failed');
    }
    const updateData: Partial<IPlayer> = {};
    if (validationResult.data.name !== undefined) updateData.name = validationResult.data.name;
    if (validationResult.data.position !== undefined)
      updateData.position = validationResult.data.position;
    if (validationResult.data.rating !== undefined)
      updateData.rating = validationResult.data.rating;
    if (validationResult.data.teamId !== undefined)
      updateData.teamId = validationResult.data.teamId;
    if (validationResult.data.avatar !== undefined) {
      updateData.avatar = await uploadToCloudinary(validationResult.data.avatar, 'avatars');
    }
    if (validationResult.data.phone !== undefined) updateData.phone = validationResult.data.phone;

    const player = await playerRepository.update(req.params.id as string, updateData);
    if (!player) {
      throw new NotFoundError('Player not found');
    }
    return res.status(200).json(mapPlayerToDTO(player));
  };

  delete = async (req: Request, res: Response) => {
    const player = await playerRepository.delete(req.params.id as string);
    if (!player) {
      throw new NotFoundError('Player not found');
    }
    return res.status(200).json({ success: true, message: 'Player deleted successfully' });
  };

  // Sync / Bulk Save players
  sync = async (req: Request, res: Response) => {
    if (!Array.isArray(req.body)) {
      throw new BadRequestError('Request body must be an array of players');
    }

    await playerRepository.deleteMany({});

    const saved = [];
    for (const p of req.body) {
      const avatarUrl = await uploadToCloudinary(p.avatar, 'avatars');
      const player = await playerRepository.create({
        id: p.id,
        name: p.name,
        position: p.position,
        rating: p.rating,
        teamId: p.teamId ?? null,
        avatar: avatarUrl,
        phone: p.phone ?? null,
      } as unknown as Partial<IPlayer>);
      saved.push(mapPlayerToDTO(player));
    }
    return res.status(200).json(saved);
  };
}

export const playerController = new PlayerController();
