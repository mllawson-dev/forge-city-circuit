import { regularGames, postseasonGames, teamById, sportById, formatDateLong } from '../data.js';
import { teamBadgeSvg } from '../icons.js';

function gameRow(g) {
  const home = teamById(g.homeTeamId), away = teamById(g.awayTeamId);
  const played = g.status === 'final';
  const homeWon = played && g.homeScore > g.awayScore;
  const awayWon = played && g.awayScore > g.homeScore;
  const seedTag = (id) => {
    const s = g.seedHome && id === g.homeTeamId ? g.seedHome : (g.seedAway && id === g.awayTeamId ? g.seedAway : null);
    return s ? `<span style="color:var(--steel); font-size:11px;">#${s}</span> ` : '';
  };
  return `
    <div class="game-row">
      <div class="when">
        <div class="date">${formatDateLong(g.date)}</div>
        <div class="time">${g.time}</div>
      </div>
      <div class="matchup">
        <div class="side ${awayWon ? 'winner' : ''}">
          ${teamBadgeSvg(away.abbr, 'var(--sport-accent)', 24)}
          ${seedTag(g.awayTeamId)}<a href="#/${g.sportIdRef}/team/${away.id}">${away.name}</a>
          ${played ? `<span class="pts">${g.awayScore}</span>` : ''}
        </div>
        <div class="side ${homeWon ? 'winner' : ''}">
          ${teamBadgeSvg(home.abbr, 'var(--sport-accent)', 24)}
          ${seedTag(g.homeTeamId)}<a href="#/${g.sportIdRef}/team/${home.id}">${home.name}</a>
          ${played ? `<span class="pts">${g.homeScore}</span>` : ''}
        </div>
        <div class="venue">${g.venue}</div>
      </div>
      <div class="status ${played ? 'final' : ''}">${played ? 'Final' : 'Upcoming'}</div>
    </div>`;
}

export function mountSchedule(container, sportId) {
  const sport = sportById(sportId);
  const regular = regularGames(sportId).map(g => ({ ...g, sportIdRef: sportId }));
  const postseason = postseasonGames(sportId).map(g => ({ ...g, sportIdRef: sportId }));
  const teamOptions = [...new Map(regular.flatMap(g => [[g.homeTeamId, teamById(g.homeTeamId)], [g.awayTeamId, teamById(g.awayTeamId)]])).values()]
    .sort((a, b) => a.name.localeCompare(b.name));

  container.innerHTML = `
    <section class="page-hero" style="--sport-accent:${sport.accent}">
      <div class="container">
        <p class="tag">${sport.name} · ${sport.seasonLabel}</p>
        <h1>Schedule</h1>
        <p class="sub">Full regular season plus the postseason bracket games.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="schedule-filters">
          <label for="team-filter">Team</label>
          <select id="team-filter">
            <option value="">All Teams</option>
            ${teamOptions.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
          </select>
          <label for="status-filter">Status</label>
          <select id="status-filter">
            <option value="">All Games</option>
            <option value="final">Final</option>
            <option value="scheduled">Upcoming</option>
          </select>
        </div>
        <p id="schedule-status" class="visually-hidden" role="status" aria-live="polite"></p>
        <div id="schedule-body"></div>
      </div>
    </section>`;

  const body = container.querySelector('#schedule-body');
  const teamFilter = container.querySelector('#team-filter');
  const statusFilter = container.querySelector('#status-filter');
  const scheduleStatus = container.querySelector('#schedule-status');

  function draw() {
    const team = teamFilter.value;
    const status = statusFilter.value;
    const filterFn = (g) => (!team || g.homeTeamId === team || g.awayTeamId === team) && (!status || g.status === status);
    const reg = regular.filter(filterFn);
    const post = postseason.filter(filterFn);
    const total = reg.length + post.length;

    let html = '';
    if (post.length) {
      html += `<div class="schedule-group"><h3>Postseason</h3>${post.map(gameRow).join('')}</div>`;
    }
    if (reg.length) {
      html += `<div class="schedule-group"><h3>Regular Season</h3>${reg.map(gameRow).join('')}</div>`;
    }
    body.innerHTML = html || '<p class="empty-note">No games match those filters.</p>';
    scheduleStatus.textContent = `${total} ${total === 1 ? 'game' : 'games'} shown`;
  }

  teamFilter.addEventListener('change', draw);
  statusFilter.addEventListener('change', draw);
  draw();
}
