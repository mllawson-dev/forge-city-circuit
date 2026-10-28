import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import * as data from '../../portal/js/data.js';
import { installSnapshot, sports, teams } from './helpers.js';

before(installSnapshot);

const isSortedBy = (list, key, direction = 1) => list.every((item, i) => i === 0 || direction * list[i - 1][key].localeCompare(item[key]) <= 0);

test('winPct formats like a box score', () => {
  assert.equal(data.winPct(6, 1), '.857');
  assert.equal(data.winPct(0, 7), '.000');
  assert.equal(data.winPct(0, 0), '.000');
  assert.equal(data.winPct(7, 0), '1.000');
});

test('gamesBehind uses the standard half-game formula', () => {
  const leader = { wins: 6, losses: 1 };
  assert.equal(data.gamesBehind(leader, { wins: 6, losses: 1 }), '—');
  assert.equal(data.gamesBehind(leader, { wins: 5, losses: 2 }), '1.0');
  assert.equal(data.gamesBehind(leader, { wins: 4, losses: 2 }), '1.5');
});

test('dates format on the calendar day given, in any time zone', () => {
  assert.equal(data.formatDate('2026-09-09'), 'Wed, Sep 9');
  assert.equal(data.formatDateLong('2026-09-13'), 'Sunday, September 13');
});

test('lookups find sports and teams by id', () => {
  assert.equal(data.sportById('basketball').name, 'Basketball');
  assert.equal(data.teamById('millbrook').name, 'Millbrook Anvils');
  assert.equal(data.teamById('nope'), undefined);
});

test('unknown sports return empty data instead of throwing', () => {
  assert.deepEqual(data.standingsFor('curling'), []);
  assert.deepEqual(data.gamesFor('curling'), []);
  assert.equal(data.bracketFor('curling'), null);
  assert.deepEqual(data.rosterFor('curling', 'ironside'), []);
});

for (const sport of sports) {
  test(`${sport.name}: regular and postseason lists split the schedule and stay in date order`, () => {
    const regular = data.regularGames(sport.id);
    const post = data.postseasonGames(sport.id);
    assert.equal(regular.length + post.length, data.gamesFor(sport.id).length);
    assert.ok(regular.every((g) => g.round === 'regular'));
    assert.ok(post.every((g) => g.round !== 'regular'));
    assert.ok(isSortedBy(regular, 'date'));
    assert.ok(isSortedBy(post, 'date'));
  });

  test(`${sport.name}: upcoming games are scheduled, earliest first, and respect the limit`, () => {
    const upcoming = data.upcomingGames(sport.id, 20);
    assert.ok(upcoming.length > 0);
    assert.ok(upcoming.every((g) => g.status === 'scheduled'));
    assert.ok(isSortedBy(upcoming, 'date'));
    assert.ok(data.upcomingGames(sport.id, 1).length <= 1);
  });

  test(`${sport.name}: recent results are final, newest first, and respect the limit`, () => {
    const recent = data.recentResults(sport.id, 5);
    assert.equal(recent.length, 5);
    assert.ok(recent.every((g) => g.status === 'final'));
    assert.ok(isSortedBy(recent, 'date', -1));
  });

  test(`${sport.name}: every team's schedule only contains that team's games`, () => {
    for (const team of teams) {
      const games = data.gamesForTeam(sport.id, team.id);
      assert.ok(games.length >= 7, `${team.id} should play at least 7 games`);
      assert.ok(games.every((g) => g.homeTeamId === team.id || g.awayTeamId === team.id));
      assert.ok(isSortedBy(games, 'date'));
    }
  });

  test(`${sport.name}: seeds are reported for playoff teams only`, () => {
    const seeded = teams.filter((t) => data.seedForTeam(sport.id, t.id) !== null);
    assert.equal(seeded.length, 4);
    assert.deepEqual(seeded.map((t) => data.seedForTeam(sport.id, t.id)).sort(), [1, 2, 3, 4]);
    for (const team of seeded) {
      assert.ok(data.standingForTeam(sport.id, team.id), `${team.id} has a standings row`);
    }
  });
}

test('league-wide upcoming and recent lists merge every sport in date order', () => {
  const upcoming = data.leagueUpcoming(6);
  const recent = data.leagueRecent(6);
  const scheduled = sports.flatMap((s) => data.gamesFor(s.id)).filter((g) => g.status === 'scheduled');
  assert.equal(upcoming.length, Math.min(6, scheduled.length));
  assert.equal(recent.length, 6);
  assert.ok(isSortedBy(upcoming, 'date'));
  assert.ok(isSortedBy(recent, 'date', -1));
  assert.ok(upcoming.every((g) => sports.some((s) => s.id === g.sportId)));
});
