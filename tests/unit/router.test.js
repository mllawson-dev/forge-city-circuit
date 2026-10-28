import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { route, match, resetRoutes } from '../../portal/js/router.js';

const segments = (path) => path.split('/').filter(Boolean);
const home = () => 'home';
const standings = () => 'standings';
const team = () => 'team';

beforeEach(() => {
  resetRoutes();
  route('/', home);
  route('/:sport/standings', standings);
  route('/:sport/team/:teamId', team);
});

test('matches the hub route with no segments', () => {
  const found = match(segments(''));
  assert.equal(found.render, home);
  assert.deepEqual(found.params, {});
});

test('captures a single parameter', () => {
  const found = match(segments('baseball/standings'));
  assert.equal(found.render, standings);
  assert.deepEqual(found.params, { sport: 'baseball' });
});

test('captures multiple parameters', () => {
  const found = match(segments('flagfootball/team/millbrook'));
  assert.equal(found.render, team);
  assert.deepEqual(found.params, { sport: 'flagfootball', teamId: 'millbrook' });
});

test('decodes URL-encoded parameters', () => {
  const found = match(segments('basketball/team/canal%20st'));
  assert.equal(found.params.teamId, 'canal st');
});

test('requires static segments to match exactly', () => {
  assert.equal(match(segments('baseball/standing')), null);
});

test('requires the same number of segments', () => {
  assert.equal(match(segments('baseball')), null);
  assert.equal(match(segments('baseball/standings/extra')), null);
});

test('returns the first registered route when two could match', () => {
  resetRoutes();
  const specific = () => 'specific';
  const general = () => 'general';
  route('/baseball/standings', specific);
  route('/:sport/standings', general);
  assert.equal(match(segments('baseball/standings')).render, specific);
  assert.equal(match(segments('basketball/standings')).render, general);
});
