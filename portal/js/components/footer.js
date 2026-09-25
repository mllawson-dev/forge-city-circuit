import { iconSvg } from '../icons.js';
import { SNAPSHOT_LABEL } from '../data.js';

export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container">
        <a class="brand" href="#/" style="gap:10px;">
          ${iconSvg('#iconLeague', 26)}
          <span class="fine">Forge City Circuit</span>
        </a>
        <span class="fine">Fictional league · fixed snapshot ${SNAPSHOT_LABEL} · © ${year}</span>
        <nav class="project-links" aria-label="Forge City Circuit project">
          <a class="fine" href="../">Project Home</a>
          <a class="fine" href="../case-study/">Read the Case Study</a>
        </nav>
      </div>
    </footer>`;
}
