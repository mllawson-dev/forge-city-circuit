import { bracketFor, teamById, sportById, formatDate } from '../data.js';
import { teamBadgeSvg } from '../icons.js';

function side(sportId, teamId, seed, score, isWinner, played) {
  const team = teamById(teamId);
  return `
    <div class="bracket-side ${played && isWinner ? 'winner' : ''}">
      <span class="seed">${seed}</span>
      ${teamBadgeSvg(team.abbr, 'var(--sport-accent)', 24)}
      <a class="name" href="#/${sportId}/team/${team.id}">${team.abbr}</a>
      ${played ? `<span class="pts">${score}</span>` : ''}
    </div>`;
}

function matchup(sportId, g) {
  const played = g.status === 'final';
  const homeWon = played && g.homeScore > g.awayScore;
  return `
    <div class="bracket-matchup">
      ${side(sportId, g.homeTeamId, g.seedHome, g.homeScore, homeWon, played)}
      ${side(sportId, g.awayTeamId, g.seedAway, g.awayScore, played && !homeWon, played)}
      <div class="when">${formatDate(g.date)}${played ? '' : ' · ' + g.time}</div>
    </div>`;
}

export function renderBracket(sportId) {
  const sport = sportById(sportId);
  const bracket = bracketFor(sportId);
  if (!bracket) return '<p class="empty-note">No postseason data.</p>';

  const [semi1, semi2] = bracket.semifinals;
  const final = bracket.final;
  const champion = final.status === 'final'
    ? teamById(final.homeScore > final.awayScore ? final.homeTeamId : final.awayTeamId)
    : null;

  return `
    <section class="page-hero" style="--sport-accent:${sport.accent}">
      <div class="container">
        <p class="tag">${sport.name} · ${sport.seasonLabel}</p>
        <h1>Playoff Bracket</h1>
        <p class="sub">Top 4 seeds, single elimination. ${champion ? `Champion: ${champion.name}.` : 'Championship scheduled next in this fixed league snapshot.'}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="bracket" style="--sport-accent:${sport.accent}">
          <div class="bracket-round">
            <div class="round-label">Semifinals</div>
            ${matchup(sportId, semi1)}
            ${matchup(sportId, semi2)}
          </div>
          <div class="bracket-round">
            <div class="round-label">Championship</div>
            ${matchup(sportId, final)}
          </div>
          <div class="bracket-round">
            <div class="bracket-champion">${champion ? champion.name + ' — Champions' : 'Title Game Next'}</div>
          </div>
        </div>
      </div>
    </section>`;
}
