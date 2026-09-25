import { loadData, sports } from './data.js';
import { injectSprite } from './icons.js';
import { route, notFound, startRouter } from './router.js';
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './views/home.js';
import { renderStandings } from './views/standings.js';
import { mountSchedule } from './views/schedule.js';
import { renderBracket } from './views/bracket.js';
import { renderTeam } from './views/team.js';

const app = document.getElementById('app');
const routeStatus = document.getElementById('route-status');

function finishRoute(title, focus = true) {
  document.title = `${title} — Forge City Circuit`;
  routeStatus.textContent = `${title} loaded`;
  if (!focus) return;
  requestAnimationFrame(() => {
    const heading = document.querySelector('main h1');
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  });
}

function shell(navCtx) {
  app.innerHTML = `
    ${renderHeader(navCtx)}
    <main id="main"><div id="outlet"></div></main>
    ${renderFooter()}`;
  return document.getElementById('outlet');
}

const validSport = (id) => sports().some(s => s.id === id);

function guardSport(id, params) {
  if (!validSport(id)) {
    const outlet = shell({});
    outlet.innerHTML = `<div class="container section"><h1>Unknown League</h1><p class="empty-note">That sport doesn't exist in the Circuit. <a href="#/">Back to the hub.</a></p></div>`;
    finishRoute('Unknown League');
    return false;
  }
  return true;
}

async function init() {
  injectSprite();
  await loadData();

  route('/', async () => {
    const outlet = shell({});
    outlet.innerHTML = renderHome();
    finishRoute('League Hub', false);
  });

  route('/:sport/standings', async ({ sport }) => {
    if (!guardSport(sport)) return;
    const outlet = shell({ sportId: sport, section: 'standings' });
    outlet.innerHTML = renderStandings(sport);
    finishRoute(`${sports().find(s => s.id === sport).name} Standings`);
  });

  route('/:sport/schedule', async ({ sport }) => {
    if (!guardSport(sport)) return;
    const outlet = shell({ sportId: sport, section: 'schedule' });
    mountSchedule(outlet, sport);
    finishRoute(`${sports().find(s => s.id === sport).name} Schedule`);
  });

  route('/:sport/bracket', async ({ sport }) => {
    if (!guardSport(sport)) return;
    const outlet = shell({ sportId: sport, section: 'bracket' });
    outlet.innerHTML = renderBracket(sport);
    finishRoute(`${sports().find(s => s.id === sport).name} Playoff Bracket`);
  });

  route('/:sport/team/:teamId', async ({ sport, teamId }) => {
    if (!guardSport(sport)) return;
    const outlet = shell({ sportId: sport, section: null });
    outlet.innerHTML = renderTeam(sport, teamId);
    const heading = outlet.querySelector('h1')?.textContent || 'Team';
    finishRoute(`${heading} · ${sports().find(s => s.id === sport).name}`);
  });

  notFound(() => {
    const outlet = shell({});
    outlet.innerHTML = `<div class="container section"><h1>Page Not Found</h1><p class="empty-note"><a href="#/">Back to the hub.</a></p></div>`;
    finishRoute('Page Not Found');
  });

  startRouter();
}

init().catch((error) => {
  console.error(error);
  document.title = 'Unable to Load — Forge City Circuit';
  app.innerHTML = `<main id="main" class="error-state"><p class="tag">Forge City Circuit</p><h1>League data unavailable</h1><p>The local snapshot could not be loaded. Make sure this folder is being viewed through a local web server, then refresh the page.</p><a class="badge-pill" href="">Try again</a></main>`;
  routeStatus.textContent = 'The league snapshot could not be loaded';
});
