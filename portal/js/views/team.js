import {
  teamById, sportById, sports, rosterFor, gamesForTeam, standingForTeam,
  seedForTeam, winPct, formatDate,
} from '../data.js';
import { teamBadgeSvg, sportIconHref, iconSvg } from '../icons.js';

function resultRow(sportId, g, teamId) {
  const isHome = g.homeTeamId === teamId;
  const oppId = isHome ? g.awayTeamId : g.homeTeamId;
  const opp = teamById(oppId);
  const played = g.status === 'final';
  let outcome = '';
  if (played) {
    const teamScore = isHome ? g.homeScore : g.awayScore;
    const oppScore = isHome ? g.awayScore : g.homeScore;
    const won = teamScore > oppScore;
    outcome = `<span class="${won ? 'streak-w' : 'streak-l'}">${won ? 'W' : 'L'}</span> ${teamScore}–${oppScore}`;
  }
  return `
    <div class="ticker-item" style="--sport-accent:var(--sport-accent)">
      ${iconSvg(sportIconHref(sportId), 20)}
      <div class="matchup">
        <div class="teams">${isHome ? 'vs' : '@'} <a href="#/${sportId}/team/${opp.id}">${opp.name}</a></div>
        <div class="meta">${formatDate(g.date)}${g.round !== 'regular' ? ' · ' + g.round : ''}</div>
      </div>
      <div class="score">${played ? outcome : g.time}</div>
    </div>`;
}

export function renderTeam(sportId, teamId) {
  const sport = sportById(sportId);
  const team = teamById(teamId);
  if (!team) return '<section class="container section"><h1>Team Not Found</h1><p class="empty-note">That franchise is not part of this league snapshot.</p></section>';

  const standing = standingForTeam(sportId, teamId);
  const seed = seedForTeam(sportId, teamId);
  const roster = rosterFor(sportId, teamId);
  const games = gamesForTeam(sportId, teamId);
  const past = games.filter(g => g.status === 'final').slice(-5).reverse();
  const next = games.find(g => g.status === 'scheduled');

  const pills = sports().map(s => `
    <a class="sport-pill ${s.id === sportId ? 'active' : ''}" style="--sport-accent:${s.accent}" href="#/${s.id}/team/${team.id}">
      ${iconSvg(sportIconHref(s.id), 16)} ${s.name}
    </a>`).join('');

  const rosterRows = roster.map(p => `
    <tr>
      <td class="num" data-label="Number">#${p.number}</td>
      <td data-label="Player">${p.name}</td>
      <td data-label="Position">${p.position}</td>
      <td data-label="Season" style="color:var(--steel)">${p.year}</td>
    </tr>`).join('');

  return `
    <section class="page-hero" style="--sport-accent:${sport.accent}">
      <div class="container">
        <div class="breadcrumb"><a href="#/${sportId}/standings">${sport.name}</a> / ${team.name}</div>
        <div class="team-hero">
          ${teamBadgeSvg(team.abbr, sport.accent, 84)}
          <div>
            <h1>${team.name}</h1>
            <div class="meta">${team.neighborhood} · ${team.venue}</div>
            <div class="sport-pills">${pills}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="stat-row">
          <div class="stat"><span class="value">${standing ? `${standing.wins}-${standing.losses}` : '—'}</span><span class="label">Record</span></div>
          <div class="stat"><span class="value">${standing ? winPct(standing.wins, standing.losses) : '—'}</span><span class="label">Win Pct</span></div>
          <div class="stat"><span class="value">${standing ? (standing.streakType ?? '—') + (standing.streak || '') : '—'}</span><span class="label">Streak</span></div>
          <div class="stat"><span class="value">${seed ? `#${seed}` : '—'}</span><span class="label">Playoff Seed</span></div>
          <div class="stat"><span class="value">${standing ? standing.pf : '—'}</span><span class="label">Points For</span></div>
          <div class="stat"><span class="value">${standing ? standing.pa : '—'}</span><span class="label">Points Against</span></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid grid--2">
          <div class="card">
            <div class="card-title"><h3>Roster</h3></div>
            <table class="roster-table">
              <thead><tr><th>#</th><th>Name</th><th>Pos</th><th>Season</th></tr></thead>
              <tbody>${rosterRows}</tbody>
            </table>
          </div>
          <div class="card">
            <div class="card-title"><h3>Recent Results</h3></div>
            <div class="ticker-list">${past.map(g => resultRow(sportId, g, teamId)).join('') || '<p class="empty-note">No games played yet.</p>'}</div>
            ${next ? `<div class="card-title" style="margin-top:22px;"><h3>Next Game</h3></div><div class="ticker-list">${resultRow(sportId, next, teamId)}</div>` : ''}
          </div>
        </div>
      </div>
    </section>`;
}
