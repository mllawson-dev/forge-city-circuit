import { standingsFor, teamById, sportById, winPct, gamesBehind, bracketFor } from '../data.js';
import { teamBadgeSvg } from '../icons.js';

export function renderStandings(sportId) {
  const sport = sportById(sportId);
  const standings = standingsFor(sportId);
  const leader = standings[0];
  const bracket = bracketFor(sportId);
  const seedOf = (teamId) => bracket?.seeds.find(s => s.teamId === teamId)?.seed;

  const rows = standings.map((s, i) => {
    const team = teamById(s.teamId);
    const seed = seedOf(s.teamId);
    const streakClass = s.streakType === 'W' ? 'streak-w' : 'streak-l';
    return `
      <tr style="--team-accent:${sport.accent}">
        <td class="team-cell" data-label="Team">
          <span style="color:var(--steel-soft); width:18px; display:inline-block;">${i + 1}</span>
          ${teamBadgeSvg(team.abbr, sport.accent, 30)}
          <a href="#/${sport.id}/team/${team.id}">${seed ? `<span class="seed-tag" title="Playoff seed ${seed}">${seed}</span>` : ''}${team.name}</a>
        </td>
        <td data-label="Wins">${s.wins}</td>
        <td data-label="Losses">${s.losses}</td>
        <td data-label="Win percentage">${winPct(s.wins, s.losses)}</td>
        <td data-label="Games behind">${gamesBehind(leader, s)}</td>
        <td data-label="Points for">${s.pf}</td>
        <td data-label="Points against">${s.pa}</td>
        <td data-label="Streak" class="${streakClass}">${s.streakType ?? '—'}${s.streak || ''}</td>
      </tr>`;
  }).join('');

  return `
    <section class="page-hero" style="--sport-accent:${sport.accent}">
      <div class="container">
        <p class="tag">${sport.name} · ${sport.seasonLabel}</p>
        <h1>Standings</h1>
        <p class="sub">Regular season complete. Top 4 seeds advance to the postseason bracket.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="card standings-card">
          <table class="standings-table">
            <caption class="visually-hidden">${sport.name} standings for the 2026 Circuit Season</caption>
            <thead>
              <tr>
                <th>Team</th><th>W</th><th>L</th><th>Pct</th><th>GB</th><th>PF</th><th>PA</th><th>Streak</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </section>`;
}
