import { Request, Response } from 'express';
import { teamRepository } from '../repositories/team.repository';
import { playerRepository } from '../repositories/player.repository';
import { matchRepository } from '../repositories/match.repository';
import { mapTeamToDTO } from '../dtos/team.dto';

export class SeedController {
  seedTeams = async (req: Request, res: Response) => {
    await teamRepository.deleteMany({});

    const initialTeams = [
      {
        id: 't1',
        name: 'Real Madrid',
        manager: 'Carlo Ancelotti',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/360px-Real_Madrid_CF.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Carlo_Ancelotti_2022.jpg/300px-Carlo_Ancelotti_2022.jpg',
      },
      {
        id: 't2',
        name: 'Manchester City',
        manager: 'Pep Guardiola',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/360px-Manchester_City_FC_badge.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Pep_Guardiola_2017.jpg/300px-Pep_Guardiola_2017.jpg',
      },
      {
        id: 't3',
        name: 'Liverpool',
        manager: 'Jürgen Klopp',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/360px-Liverpool_FC.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/J%C3%BCrgen_Klopp_%28cropped%29.jpg/300px-J%C3%BCrgen_Klopp_%28cropped%29.jpg',
      },
      {
        id: 't4',
        name: 'Manchester United',
        manager: 'Sir Alex Ferguson',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/360px-Manchester_United_FC_crest.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sir_Alex_Ferguson_2009.jpg/300px-Sir_Alex_Ferguson_2009.jpg',
      },
      {
        id: 't5',
        name: 'Barcelona',
        manager: 'Luis Enrique',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona.svg/360px-FC_Barcelona.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Luis_Enrique_2015_%28cropped%29.jpg/300px-Luis_Enrique_2015_%28cropped%29.jpg',
      },
      {
        id: 't6',
        name: 'Arsenal',
        manager: 'Arsène Wenger',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/360px-Arsenal_FC.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Ars%C3%A8ne_Wenger_in_2016.jpg/300px-Ars%C3%A8ne_Wenger_in_2016.jpg',
      },
      {
        id: 't7',
        name: 'Bayern Munich',
        manager: 'Hansi Flick',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/360px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Hansi_Flick_2020_%28cropped%29.jpg/300px-Hansi_Flick_2020_%28cropped%29.jpg',
      },
      {
        id: 't8',
        name: 'Chelsea',
        manager: 'José Mourinho',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/360px-Chelsea_FC.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Jos%C3%A9_Mourinho_in_2018.jpg/300px-Jos%C3%A9_Mourinho_in_2018.jpg',
      },
    ];

    const seeded = await teamRepository.insertMany(initialTeams);
    return res.status(201).json({
      success: true,
      message: 'Initial teams seeded successfully',
      data: seeded.map(mapTeamToDTO),
    });
  };

  resetAll = async (req: Request, res: Response) => {
    await playerRepository.deleteMany({});
    await matchRepository.deleteMany({});
    await teamRepository.deleteMany({});

    const initialTeams = [
      {
        id: 't1',
        name: 'Real Madrid',
        manager: 'Carlo Ancelotti',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/360px-Real_Madrid_CF.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Carlo_Ancelotti_2022.jpg/300px-Carlo_Ancelotti_2022.jpg',
      },
      {
        id: 't2',
        name: 'Manchester City',
        manager: 'Pep Guardiola',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/360px-Manchester_City_FC_badge.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Pep_Guardiola_2017.jpg/300px-Pep_Guardiola_2017.jpg',
      },
      {
        id: 't3',
        name: 'Liverpool',
        manager: 'Jürgen Klopp',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/360px-Liverpool_FC.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/J%C3%BCrgen_Klopp_%28cropped%29.jpg/300px-J%C3%BCrgen_Klopp_%28cropped%29.jpg',
      },
      {
        id: 't4',
        name: 'Manchester United',
        manager: 'Sir Alex Ferguson',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/360px-Manchester_United_FC_crest.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sir_Alex_Ferguson_2009.jpg/300px-Sir_Alex_Ferguson_2009.jpg',
      },
      {
        id: 't5',
        name: 'Barcelona',
        manager: 'Luis Enrique',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona.svg/360px-FC_Barcelona.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Luis_Enrique_2015_%28cropped%29.jpg/300px-Luis_Enrique_2015_%28cropped%29.jpg',
      },
      {
        id: 't6',
        name: 'Arsenal',
        manager: 'Arsène Wenger',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/360px-Arsenal_FC.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Ars%C3%A8ne_Wenger_in_2016.jpg/300px-Ars%C3%A8ne_Wenger_in_2016.jpg',
      },
      {
        id: 't7',
        name: 'Bayern Munich',
        manager: 'Hansi Flick',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/360px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Hansi_Flick_2020_%28cropped%29.jpg/300px-Hansi_Flick_2020_%28cropped%29.jpg',
      },
      {
        id: 't8',
        name: 'Chelsea',
        manager: 'José Mourinho',
        averageRating: 0,
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/360px-Chelsea_FC.svg.png',
        managerAvatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Jos%C3%A9_Mourinho_in_2018.jpg/300px-Jos%C3%A9_Mourinho_in_2018.jpg',
      },
    ];
    await teamRepository.insertMany(initialTeams);

    return res.status(200).json({
      success: true,
      message: 'Database reset and teams seeded successfully',
    });
  };
}

export const seedController = new SeedController();
