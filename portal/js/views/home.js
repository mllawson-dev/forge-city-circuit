import { sports, standingsFor, teamById, leagueUpcoming, leagueRecent, formatDate, sportById, SNAPSHOT_LABEL } from '../data.js';
import { sportIconHref, iconSvg, teamBadgeSvg } from '../icons.js';

function sportTile(sport) {
  const top3 = standingsFor(sport.id).slice(0, 3);
  const rows = top3.map((s, i) => {
    const team = teamById(s.teamId);
    return `<li><span class="tile-team"><span class="rank">${i + 1}.</span>${teamBadgeSvg(team.abbr, sport.accent, 22)}${team.name}</span><span>${s.wins}-${s.losses}</span></li>`;
  }).join('');
  return `
    <div class="sport-tile" style="--sport-accent:${sport.accent}">
      <div class="sport-tile__head">
        ${iconSvg(sportIconHref(sport.id), 34)}
        <div>
          <h3>${sport.name}</h3>
          <div class="season-label">${sport.seasonLabel}</div>
        </div>
      </div>
      <ol>${rows}</ol>
      <a class="sport-tile__cta" href="#/${sport.id}/standings">Full standings →</a>
    </div>`;
}

function tickerItem(g, opts) {
  const sport = sportById(g.sportId);
  const home = teamById(g.homeTeamId), away = teamById(g.awayTeamId);
  const scoreOrTime = opts.showScore
    ? `${g.awayScore}–${g.homeScore}`
    : g.time;
  return `
    <div class="ticker-item" style="--sport-accent:${sport.accent}">
      ${iconSvg(sportIconHref(g.sportId), 20)}
      <div class="matchup">
        <div class="teams">${away.abbr} @ ${home.abbr} <span style="color:var(--steel-soft)">· ${sport.name}${g.round !== 'regular' ? ' · ' + g.round : ''}</span></div>
        <div class="meta">${formatDate(g.date)}</div>
      </div>
      <div class="score">${scoreOrTime}</div>
    </div>`;
}

export function renderHome() {
  const upcoming = leagueUpcoming(6);
  const recent = leagueRecent(6);
  return `
    <section class="page-hero">
      <div class="container" style="display:flex; align-items:center; gap:24px; flex-wrap:wrap;">
        ${iconSvg('#iconLeague', 72)}
        <div>
          <p class="tag" style="margin:0 0 6px;">Forge City Circuit</p>
          <h1>One City. Every Season.</h1>
          <p class="sub">Standings, schedules, and playoff brackets for baseball, basketball, and flag football — eight neighborhood franchises, one league.</p>
          <p class="snapshot-note">Fictional league snapshot · ${SNAPSHOT_LABEL}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid grid--3">
          ${sports().map(sportTile).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid grid--2">
          <div class="card">
            <div class="card-title"><h3>Next Up</h3></div>
            <div class="ticker-list">${upcoming.map(g => tickerItem(g, { showScore: false })).join('') || '<p class="empty-note">Nothing scheduled right now.</p>'}</div>
          </div>
          <div class="card">
            <div class="card-title"><h3>Latest Results</h3></div>
            <div class="ticker-list">${recent.map(g => tickerItem(g, { showScore: true })).join('') || '<p class="empty-note">No results yet.</p>'}</div>
          </div>
        </div>
      </div>
    </section>`;
}
