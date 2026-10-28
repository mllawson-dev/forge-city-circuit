// Minimal hash router. Routes are registered as pattern -> render(params).
// Pattern segments starting with ":" are captured as params.

const routes = [];

export function route(pattern, render) {
  const segments = pattern.split('/').filter(Boolean);
  routes.push({ segments, render });
}

// Exported for unit tests: returns { render, params } for the first matching route, or null.
export function match(pathSegments) {
  for (const r of routes) {
    if (r.segments.length !== pathSegments.length) continue;
    const params = {};
    let ok = true;
    for (let i = 0; i < r.segments.length; i++) {
      const rs = r.segments[i];
      const ps = pathSegments[i];
      if (rs.startsWith(':')) params[rs.slice(1)] = decodeURIComponent(ps);
      else if (rs !== ps) { ok = false; break; }
    }
    if (ok) return { render: r.render, params };
  }
  return null;
}

// Exported for unit tests: clears registered routes.
export function resetRoutes() { routes.length = 0; }

let onNotFound = () => {};
export function notFound(fn) { onNotFound = fn; }

async function dispatch() {
  const hash = location.hash.replace(/^#\/?/, '');
  const segments = hash.split('/').filter(Boolean);
  const found = match(segments);
  window.scrollTo(0, 0);
  if (found) await found.render(found.params);
  else onNotFound();
}

export function startRouter() {
  window.addEventListener('hashchange', dispatch);
  dispatch();
}

export function currentPath() {
  return location.hash.replace(/^#\/?/, '');
}
