// Data access layer — fetches the mock JSON once and exposes small,
// synchronous-feeling accessors the views can call after `loadData()`.

let TEAMS = [];
let SPORTS = [];
let ROSTERS = {};
let SEASON = {};
export const SNAPSHOT_LABEL = 'September 10, 2026';

async function readJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path} (${response.status})`);
  return response.json();
}

export async function loadData() {
  const [teams, sports, rosters, season] = await Promise.all([
    readJson('js/data/teams.json'),
    readJson('js/data/sports.json'),
    readJson('js/data/rosters.json'),
    readJson('js/data/season.json'),
  ]);
  setData({ teams, sports, rosters, season });
}

// Installs a league snapshot directly. loadData() uses it in the browser; tests use it in Node.
export function setData({ teams, sports, rosters, season }) {
  TEAMS = teams; SPORTS = sports; ROSTERS = rosters; SEASON = season;
}

export const sports = () => SPORTS;
export const sportById = (id) => SPORTS.find(s => s.id === id);
export const teams = () => TEAMS;
export const teamById = (id) => TEAMS.find(t => t.id === id);

export const standingsFor = (sportId) => SEASON[sportId]?.standings ?? [];
export const gamesFor = (sportId) => SEASON[sportId]?.games ?? [];
export const bracketFor = (sportId) => SEASON[sportId]?.bracket ?? null;
export const rosterFor = (sportId, teamId) => ROSTERS[sportId]?.[teamId] ?? [];

export function regularGames(sportId) {
  return gamesFor(sportId).filter(g => g.round === 'regular').sort((a, b) => a.date.localeCompare(b.date));
}
export function postseasonGames(sportId) {
  return gamesFor(sportId).filter(g => g.round !== 'regular').sort((a, b) => a.date.localeCompare(b.date));
}
export function upcomingGames(sportId, limit = 5) {
  return gamesFor(sportId).filter(g => g.status === 'scheduled').sort((a, b) => a.date.localeCompare(b.date)).slice(0, limit);
}
export function recentResults(sportId, limit = 5) {
  return gamesFor(sportId).filter(g => g.status === 'final').sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
export function gamesForTeam(sportId, teamId) {
  return gamesFor(sportId).filter(g => g.homeTeamId === teamId || g.awayTeamId === teamId).sort((a, b) => a.date.localeCompare(b.date));
}
export function standingForTeam(sportId, teamId) {
  return standingsFor(sportId).find(s => s.teamId === teamId);
}
export function seedForTeam(sportId, teamId) {
  const b = bracketFor(sportId);
  return b?.seeds.find(s => s.teamId === teamId)?.seed ?? null;
}

// "Next up" across the whole league — earliest scheduled game per sport, sorted.
export function leagueUpcoming(limit = 6) {
  const all = [];
  for (const s of SPORTS) {
    for (const g of upcomingGames(s.id, 20)) all.push({ ...g, sportId: s.id });
  }
  return all.sort((a, b) => a.date.localeCompare(b.date)).slice(0, limit);
}
export function leagueRecent(limit = 6) {
  const all = [];
  for (const s of SPORTS) {
    for (const g of recentResults(s.id, 20)) all.push({ ...g, sportId: s.id });
  }
  return all.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
export function formatDateLong(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}
export function winPct(w, l) {
  const total = w + l;
  return total === 0 ? '.000' : (w / total).toFixed(3).replace(/^0/, '');
}
export function gamesBehind(leader, team) {
  const gb = ((leader.wins - team.wins) + (team.losses - leader.losses)) / 2;
  return gb === 0 ? '—' : gb.toFixed(1);
}
