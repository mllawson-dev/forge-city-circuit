import { sports } from '../data.js';
import { sportIconHref, iconSvg } from '../icons.js';

const SUBNAV = [
  { key: 'standings', label: 'Standings' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'bracket', label: 'Bracket' },
];

export function renderHeader({ sportId, section }) {
  const switcher = sports().map(s => `
    <a class="${s.id === sportId ? 'active' : ''}" ${s.id === sportId ? 'aria-current="true"' : ''} style="--sport-accent:${s.accent}" href="#/${s.id}/standings">
      ${iconSvg(sportIconHref(s.id), 20)} ${s.name}
    </a>`).join('');

  const subnav = sportId ? `
    <nav class="subnav container" aria-label="${sports().find(s => s.id === sportId).name} sections">
      ${SUBNAV.map(item => `<a class="${item.key === section ? 'active' : ''}" ${item.key === section ? 'aria-current="page"' : ''} style="--sport-accent:${sports().find(s => s.id === sportId).accent}" href="#/${sportId}/${item.key}">${item.label}</a>`).join('')}
    </nav>` : '';

  return `
    <header class="site-header">
      <div class="container site-header__top">
        <a class="brand" href="#/">
          ${iconSvg('#iconLeague', 38)}
          <div class="brand-text">
            <span class="name">Forge City Circuit</span>
            <span class="tagline">One City. Every Season.</span>
          </div>
        </a>
        <a class="project-home" href="../" aria-label="Return to Forge City Circuit project home">Project Home <span aria-hidden="true">↗</span></a>
        <nav class="sport-switcher" aria-label="Choose a sport">${switcher}</nav>
      </div>
      ${subnav}
    </header>`;
}
