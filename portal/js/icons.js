// Forge City Circuit — shared icon sprite sheet.
// Symbol geometry copied exactly from the identity system's IconSheet.dc.html
// (league + 3 sport marks, full and 28px-simplified variants) so the site
// carries the same crest artwork pixel-for-pixel. Injected once into <body>.

export const SHIELD_PATH = 'M60,20 L260,20 L300,60 L300,220 Q300,304 160,362 Q20,304 20,220 L20,60 Z';
export const SHIELD_INNER_PATH = 'M74,34 L246,34 L286,74 L286,216 Q286,290 160,342 Q34,290 34,216 L34,74 Z';
export const RIVETS = [
  [60, 20], [260, 20], [300, 60], [300, 220], [20, 60], [20, 220],
];

export const SPRITE_HTML = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="iconLeague" viewBox="0 0 320 380">
      <path d="M60,20 L260,20 L300,60 L300,220 Q300,304 160,362 Q20,304 20,220 L20,60 Z" fill="oklch(0.24 0.02 40)" stroke="oklch(0.55 0.21 25)" stroke-width="6"/>
      <path d="M74,34 L246,34 L286,74 L286,216 Q286,290 160,342 Q34,290 34,216 L34,74 Z" fill="none" stroke="oklch(0.97 0.004 80 / 0.35)" stroke-width="2"/>
      <circle cx="60" cy="20" r="6" fill="oklch(0.55 0.21 25)"/><circle cx="260" cy="20" r="6" fill="oklch(0.55 0.21 25)"/>
      <circle cx="300" cy="60" r="6" fill="oklch(0.55 0.21 25)"/><circle cx="300" cy="220" r="6" fill="oklch(0.55 0.21 25)"/>
      <circle cx="20" cy="60" r="6" fill="oklch(0.55 0.21 25)"/><circle cx="20" cy="220" r="6" fill="oklch(0.55 0.21 25)"/>
      <ellipse cx="160" cy="176" rx="82" ry="48" fill="none" stroke="oklch(0.55 0.21 25)" stroke-width="9"/>
      <text x="160" y="193" text-anchor="middle" font-family="Anton, sans-serif" font-size="46" fill="oklch(0.97 0.004 80)" letter-spacing="1">FCC</text>
    </symbol>
    <symbol id="iconBaseball" viewBox="0 0 320 380">
      <path d="M60,20 L260,20 L300,60 L300,220 Q300,304 160,362 Q20,304 20,220 L20,60 Z" fill="oklch(0.24 0.02 40)" stroke="oklch(0.55 0.21 25)" stroke-width="6"/>
      <path d="M74,34 L246,34 L286,74 L286,216 Q286,290 160,342 Q34,290 34,216 L34,74 Z" fill="none" stroke="oklch(0.97 0.004 80 / 0.35)" stroke-width="2"/>
      <circle cx="60" cy="20" r="6" fill="oklch(0.55 0.21 25)"/><circle cx="260" cy="20" r="6" fill="oklch(0.55 0.21 25)"/>
      <circle cx="300" cy="60" r="6" fill="oklch(0.55 0.21 25)"/><circle cx="300" cy="220" r="6" fill="oklch(0.55 0.21 25)"/>
      <circle cx="20" cy="60" r="6" fill="oklch(0.55 0.21 25)"/><circle cx="20" cy="220" r="6" fill="oklch(0.55 0.21 25)"/>
      <ellipse cx="160" cy="176" rx="82" ry="48" fill="none" stroke="oklch(0.55 0.21 25)" stroke-width="9"/>
      <g transform="translate(160,176) scale(0.425) translate(-100,-100)">
        <defs><clipPath id="ballClipSprite"><circle cx="100" cy="100" r="80"/></clipPath></defs>
        <circle cx="100" cy="100" r="80" fill="oklch(0.97 0.004 80)" stroke="oklch(0.16 0.02 40)" stroke-width="4"/>
        <path d="M100 180 A80 80 0 0 0 180 100 A80 80 0 0 1 100 180 Z" fill="oklch(0.9 0.004 80)"/>
        <g clip-path="url(#ballClipSprite)" transform="rotate(-38 100 100)">
          <path d="M50 36 Q92 100 50 164" fill="none" stroke="oklch(0.55 0.21 25)" stroke-width="2"/>
          <path d="M150 36 Q108 100 150 164" fill="none" stroke="oklch(0.55 0.21 25)" stroke-width="2"/>
          <path d="M51.3 50.7L54.4 43.1L62.5 44.2M57.7 64.5L61.7 57.3L69.6 59.3M62 78.2L66.9 71.6L74.5 74.5M64.3 91.7L70 85.8L77.1 89.8M64.5 105L71 100L77.5 105M62.8 118.2L70 114.2L75.7 120.1M59.2 131.4L66.9 128.4L71.7 135.1M53.7 144.6L61.7 142.7L65.6 149.9M46.3 157.9L54.4 156.9L57.5 164.5" fill="none" stroke="oklch(0.55 0.21 25)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M148.7 50.7L145.6 43.1L137.5 44.2M142.3 64.5L138.3 57.3L130.4 59.3M138 78.2L133.1 71.6L125.5 74.5M135.7 91.7L130 85.8L122.9 89.8M135.5 105L129 100L122.5 105M137.2 118.2L130 114.2L124.3 120.1M140.8 131.4L133.1 128.4L128.3 135.1M146.3 144.6L138.3 142.7L134.4 149.9M153.7 157.9L145.6 156.9L142.5 164.5" fill="none" stroke="oklch(0.55 0.21 25)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </g>
    </symbol>
    <symbol id="iconBasketball" viewBox="0 0 320 380">
      <path d="M60,20 L260,20 L300,60 L300,220 Q300,304 160,362 Q20,304 20,220 L20,60 Z" fill="oklch(0.24 0.02 40)" stroke="oklch(0.62 0.16 55)" stroke-width="6"/>
      <path d="M74,34 L246,34 L286,74 L286,216 Q286,290 160,342 Q34,290 34,216 L34,74 Z" fill="none" stroke="oklch(0.97 0.004 80 / 0.35)" stroke-width="2"/>
      <circle cx="60" cy="20" r="6" fill="oklch(0.62 0.16 55)"/><circle cx="260" cy="20" r="6" fill="oklch(0.62 0.16 55)"/>
      <circle cx="300" cy="60" r="6" fill="oklch(0.62 0.16 55)"/><circle cx="300" cy="220" r="6" fill="oklch(0.62 0.16 55)"/>
      <circle cx="20" cy="60" r="6" fill="oklch(0.62 0.16 55)"/><circle cx="20" cy="220" r="6" fill="oklch(0.62 0.16 55)"/>
      <ellipse cx="160" cy="176" rx="82" ry="48" fill="none" stroke="oklch(0.62 0.16 55)" stroke-width="9"/>
      <circle cx="160" cy="176" r="34" fill="oklch(0.62 0.16 55)"/>
      <line x1="160" y1="142" x2="160" y2="210" stroke="oklch(0.24 0.02 40)" stroke-width="2.5"/>
      <path d="M126,176 Q160,164 194,176" fill="none" stroke="oklch(0.24 0.02 40)" stroke-width="2.5"/>
      <path d="M136,152 Q160,176 136,200" fill="none" stroke="oklch(0.24 0.02 40)" stroke-width="2.5"/>
      <path d="M184,152 Q160,176 184,200" fill="none" stroke="oklch(0.24 0.02 40)" stroke-width="2.5"/>
    </symbol>
    <symbol id="iconFootball" viewBox="0 0 320 380">
      <path d="M60,20 L260,20 L300,60 L300,220 Q300,304 160,362 Q20,304 20,220 L20,60 Z" fill="oklch(0.24 0.02 40)" stroke="oklch(0.5 0.06 240)" stroke-width="6"/>
      <path d="M74,34 L246,34 L286,74 L286,216 Q286,290 160,342 Q34,290 34,216 L34,74 Z" fill="none" stroke="oklch(0.97 0.004 80 / 0.35)" stroke-width="2"/>
      <circle cx="60" cy="20" r="6" fill="oklch(0.5 0.06 240)"/><circle cx="260" cy="20" r="6" fill="oklch(0.5 0.06 240)"/>
      <circle cx="300" cy="60" r="6" fill="oklch(0.5 0.06 240)"/><circle cx="300" cy="220" r="6" fill="oklch(0.5 0.06 240)"/>
      <circle cx="20" cy="60" r="6" fill="oklch(0.5 0.06 240)"/><circle cx="20" cy="220" r="6" fill="oklch(0.5 0.06 240)"/>
      <ellipse cx="160" cy="176" rx="82" ry="48" fill="none" stroke="oklch(0.5 0.06 240)" stroke-width="9"/>
      <g transform="translate(160,176) scale(0.5) translate(-130,-90)">
        <defs><clipPath id="ftbClipSprite"><path d="M12 90 C50 2 210 2 248 90 C210 178 50 178 12 90 Z"/></clipPath></defs>
        <path d="M12 90 C50 2 210 2 248 90 C210 178 50 178 12 90 Z" fill="oklch(0.5 0.06 240)"/>
        <g clip-path="url(#ftbClipSprite)">
          <path d="M60 6 V174" fill="none" stroke="oklch(0.97 0.004 80)" stroke-width="15"/>
          <path d="M200 6 V174" fill="none" stroke="oklch(0.97 0.004 80)" stroke-width="15"/>
          <path d="M104 90 H164" fill="none" stroke="oklch(0.97 0.004 80)" stroke-width="7" stroke-linecap="round"/>
          <path d="M104 78 V102 M116 77 V103 M128 76 V104 M140 76 V104 M152 77 V103 M164 78 V102" fill="none" stroke="oklch(0.97 0.004 80)" stroke-width="7" stroke-linecap="round"/>
        </g>
      </g>
    </symbol>
    <symbol id="iconLeagueSmall" viewBox="0 0 320 380">
      <path d="M60,20 L260,20 L300,60 L300,220 Q300,304 160,362 Q20,304 20,220 L20,60 Z" fill="oklch(0.24 0.02 40)" stroke="oklch(0.55 0.21 25)" stroke-width="8"/>
      <text x="160" y="209" text-anchor="middle" font-family="Anton, sans-serif" font-size="92" fill="oklch(0.97 0.004 80)" letter-spacing="1">FCC</text>
    </symbol>
    <symbol id="iconBaseballSmall" viewBox="0 0 320 380">
      <path d="M60,20 L260,20 L300,60 L300,220 Q300,304 160,362 Q20,304 20,220 L20,60 Z" fill="oklch(0.24 0.02 40)" stroke="oklch(0.55 0.21 25)" stroke-width="8"/>
      <g transform="translate(160,176) scale(0.75) translate(-100,-100)">
        <defs><clipPath id="ballClipSpriteSm"><circle cx="100" cy="100" r="80"/></clipPath></defs>
        <circle cx="100" cy="100" r="80" fill="oklch(0.97 0.004 80)" stroke="oklch(0.16 0.02 40)" stroke-width="4"/>
        <path d="M100 180 A80 80 0 0 0 180 100 A80 80 0 0 1 100 180 Z" fill="oklch(0.9 0.004 80)"/>
        <g clip-path="url(#ballClipSpriteSm)" transform="rotate(-38 100 100)">
          <path d="M50 36 Q92 100 50 164" fill="none" stroke="oklch(0.55 0.21 25)" stroke-width="2"/>
          <path d="M150 36 Q108 100 150 164" fill="none" stroke="oklch(0.55 0.21 25)" stroke-width="2"/>
          <path d="M51.3 50.7L54.4 43.1L62.5 44.2M57.7 64.5L61.7 57.3L69.6 59.3M62 78.2L66.9 71.6L74.5 74.5M64.3 91.7L70 85.8L77.1 89.8M64.5 105L71 100L77.5 105M62.8 118.2L70 114.2L75.7 120.1M59.2 131.4L66.9 128.4L71.7 135.1M53.7 144.6L61.7 142.7L65.6 149.9M46.3 157.9L54.4 156.9L57.5 164.5" fill="none" stroke="oklch(0.55 0.21 25)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M148.7 50.7L145.6 43.1L137.5 44.2M142.3 64.5L138.3 57.3L130.4 59.3M138 78.2L133.1 71.6L125.5 74.5M135.7 91.7L130 85.8L122.9 89.8M135.5 105L129 100L122.5 105M137.2 118.2L130 114.2L124.3 120.1M140.8 131.4L133.1 128.4L128.3 135.1M146.3 144.6L138.3 142.7L134.4 149.9M153.7 157.9L145.6 156.9L142.5 164.5" fill="none" stroke="oklch(0.55 0.21 25)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </g>
    </symbol>
    <symbol id="iconBasketballSmall" viewBox="0 0 320 380">
      <path d="M60,20 L260,20 L300,60 L300,220 Q300,304 160,362 Q20,304 20,220 L20,60 Z" fill="oklch(0.24 0.02 40)" stroke="oklch(0.62 0.16 55)" stroke-width="8"/>
      <circle cx="160" cy="176" r="58" fill="oklch(0.62 0.16 55)"/>
      <line x1="160" y1="118" x2="160" y2="234" stroke="oklch(0.24 0.02 40)" stroke-width="4.5"/>
      <path d="M102,176 Q160,155.6 218,176" fill="none" stroke="oklch(0.24 0.02 40)" stroke-width="4.5"/>
      <path d="M119,135 Q160,176 119,217" fill="none" stroke="oklch(0.24 0.02 40)" stroke-width="4.5"/>
      <path d="M201,135 Q160,176 201,217" fill="none" stroke="oklch(0.24 0.02 40)" stroke-width="4.5"/>
    </symbol>
    <symbol id="iconFootballSmall" viewBox="0 0 320 380">
      <path d="M60,20 L260,20 L300,60 L300,220 Q300,304 160,362 Q20,304 20,220 L20,60 Z" fill="oklch(0.24 0.02 40)" stroke="oklch(0.5 0.06 240)" stroke-width="8"/>
      <g transform="translate(160,176) scale(0.8) translate(-130,-90)">
        <defs><clipPath id="ftbClipSpriteSm"><path d="M12 90 C50 2 210 2 248 90 C210 178 50 178 12 90 Z"/></clipPath></defs>
        <path d="M12 90 C50 2 210 2 248 90 C210 178 50 178 12 90 Z" fill="oklch(0.5 0.06 240)"/>
        <g clip-path="url(#ftbClipSpriteSm)">
          <path d="M60 6 V174" fill="none" stroke="oklch(0.97 0.004 80)" stroke-width="15"/>
          <path d="M200 6 V174" fill="none" stroke="oklch(0.97 0.004 80)" stroke-width="15"/>
          <path d="M104 90 H164" fill="none" stroke="oklch(0.97 0.004 80)" stroke-width="7" stroke-linecap="round"/>
          <path d="M104 78 V102 M116 77 V103 M128 76 V104 M140 76 V104 M152 77 V103 M164 78 V102" fill="none" stroke="oklch(0.97 0.004 80)" stroke-width="7" stroke-linecap="round"/>
        </g>
      </g>
    </symbol>
  </defs>
</svg>`;

const SPORT_ICON = {
  baseball: 'iconBaseball',
  basketball: 'iconBasketball',
  flagfootball: 'iconFootball',
};
const SPORT_ICON_SMALL = {
  baseball: 'iconBaseballSmall',
  basketball: 'iconBasketballSmall',
  flagfootball: 'iconFootballSmall',
};

export function injectSprite() {
  if (document.getElementById('fcc-sprite')) return;
  const wrap = document.createElement('div');
  wrap.id = 'fcc-sprite';
  wrap.innerHTML = SPRITE_HTML;
  document.body.prepend(wrap);
}

export function sportIconHref(sportId, small = false) {
  const id = small ? SPORT_ICON_SMALL[sportId] : SPORT_ICON[sportId];
  return `#${id || 'iconLeague'}`;
}

export function iconSvg(href, size = 24, extraClass = '') {
  return `<svg class="icon ${extraClass}" width="${size}" height="${size * (380 / 320)}" viewBox="0 0 320 380" aria-hidden="true" focusable="false"><use href="${href}"></use></svg>`;
}

// A per-team badge: same shield + rivet frame as the identity marks, but
// carrying the team's initials instead of a sport icon or the league
// monogram — the system extended one level down, from league to franchise.
export function teamBadgeSvg(abbr, accent, size = 48) {
  return `<svg class="icon team-badge" width="${size}" height="${size * (380 / 320)}" viewBox="0 0 320 380" aria-hidden="true" focusable="false">
    <path d="${SHIELD_PATH}" fill="oklch(0.24 0.02 40)" stroke="${accent}" stroke-width="8"/>
    <text x="160" y="205" text-anchor="middle" font-family="Anton, sans-serif" font-size="88" fill="oklch(0.97 0.004 80)" letter-spacing="1">${abbr}</text>
  </svg>`;
}
