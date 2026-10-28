// Loads the real league snapshot from disk so unit tests run against the same data the portal ships.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { setData } from '../../portal/js/data.js';

const dataDir = fileURLToPath(new URL('../../portal/js/data/', import.meta.url));
const read = (name) => JSON.parse(readFileSync(dataDir + name, 'utf8'));

export const teams = read('teams.json');
export const sports = read('sports.json');
export const rosters = read('rosters.json');
export const season = read('season.json');

export function installSnapshot() {
  setData({ teams, sports, rosters, season });
}

export const isFinal = (game) => game.status === 'final';
export const winnerOf = (game) => (game.homeScore > game.awayScore ? game.homeTeamId : game.awayTeamId);
