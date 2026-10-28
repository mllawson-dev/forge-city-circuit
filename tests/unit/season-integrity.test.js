// "Every view tells the same story": these tests recompute the standings, seeds and bracket
// from the raw game results and check they agree with what the portal displays.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { teams, sports, rosters, season, isFinal, winnerOf } from './helpers.js';

const teamIds = new Set(teams.map((t) => t.id));
const venueOf = Object.fromEntries(teams.map((t) => [t.id, t.venue]));

test('the snapshot covers every sport and every team', () => {
  assert.equal(teams.length, 8);
  assert.deepEqual(Object.keys(season).sort(), sports.map((s) => s.id).sort());
  assert.equal(new Set(teams.map((t) => t.abbr)).size, teams.length, 'team abbreviations are unique');
});

for (const sport of sports) {
  const { games, standings, bracket } = season[sport.id];
  const regular = games.filter((g) => g.round === 'regular');

  test(`${sport.name}: every game references real teams, has a venue and a valid state`, () => {
    assert.equal(new Set(games.map((g) => g.id)).size, games.length, 'game ids are unique');
    for (const g of games) {
      assert.ok(teamIds.has(g.homeTeamId) && teamIds.has(g.awayTeamId), `${g.id} teams exist`);
      assert.notEqual(g.homeTeamId, g.awayTeamId, `${g.id} is not a team playing itself`);
      assert.equal(g.venue, venueOf[g.homeTeamId], `${g.id} is played at the home team's venue`);
      assert.match(g.date, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(['final', 'scheduled'].includes(g.status), `${g.id} status`);
      if (isFinal(g)) {
        assert.ok(Number.isInteger(g.homeScore) && Number.isInteger(g.awayScore), `${g.id} has scores`);
        assert.notEqual(g.homeScore, g.awayScore, `${g.id} has a winner`);
      } else {
        assert.equal(g.homeScore ?? null, null, `${g.id} has no score yet`);
        assert.equal(g.awayScore ?? null, null, `${g.id} has no score yet`);
      }
    }
  });

  test(`${sport.name}: the regular season is a full round robin`, () => {
    const pairs = new Set(regular.map((g) => [g.homeTeamId, g.awayTeamId].sort().join('|')));
    assert.equal(regular.length, 28);
    assert.equal(pairs.size, 28, 'every pair of teams meets exactly once');
  });

  test(`${sport.name}: standings match the game results exactly`, () => {
    const record = Object.fromEntries([...teamIds].map((id) => [id, { wins: 0, losses: 0, pf: 0, pa: 0, results: [] }]));
    const played = regular.filter(isFinal).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    for (const g of played) {
      const home = record[g.homeTeamId];
      const away = record[g.awayTeamId];
      home.pf += g.homeScore; home.pa += g.awayScore;
      away.pf += g.awayScore; away.pa += g.homeScore;
      const winner = winnerOf(g);
      for (const [id, rec] of [[g.homeTeamId, home], [g.awayTeamId, away]]) {
        const won = id === winner;
        rec[won ? 'wins' : 'losses'] += 1;
        rec.results.push(won ? 'W' : 'L');
      }
    }

    assert.equal(standings.length, teamIds.size);
    for (const row of standings) {
      const rec = record[row.teamId];
      const last = rec.results.at(-1);
      let streak = 0;
      for (let i = rec.results.length - 1; i >= 0 && rec.results[i] === last; i--) streak++;
      assert.deepEqual(
        { wins: row.wins, losses: row.losses, pf: row.pf, pa: row.pa, streak: row.streak, streakType: row.streakType },
        { wins: rec.wins, losses: rec.losses, pf: rec.pf, pa: rec.pa, streak, streakType: last },
        `${row.teamId} standings row`
      );
    }
  });

  test(`${sport.name}: standings are ordered best record first`, () => {
    const pct = (row) => row.wins / (row.wins + row.losses);
    standings.forEach((row, i) => {
      if (i > 0) assert.ok(pct(standings[i - 1]) >= pct(row), `${standings[i - 1].teamId} ranks above ${row.teamId}`);
    });
  });

  test(`${sport.name}: the top four teams are seeded 1–4 in standings order`, () => {
    const seeded = [...bracket.seeds].sort((a, b) => a.seed - b.seed).map((s) => s.teamId);
    assert.deepEqual(seeded, standings.slice(0, 4).map((r) => r.teamId));
  });

  test(`${sport.name}: semifinals pair 1 v 4 and 2 v 3, and the final hosts the winners`, () => {
    const [semi1, semi2] = bracket.semifinals;
    const seedOf = Object.fromEntries(bracket.seeds.map((s) => [s.teamId, s.seed]));
    for (const semi of bracket.semifinals) {
      assert.equal(semi.seedHome, seedOf[semi.homeTeamId]);
      assert.equal(semi.seedAway, seedOf[semi.awayTeamId]);
      assert.equal(semi.seedHome + semi.seedAway, 5, `${semi.id} pairs seeds that add to 5`);
    }
    assert.deepEqual(
      new Set([bracket.final.homeTeamId, bracket.final.awayTeamId]),
      new Set([winnerOf(semi1), winnerOf(semi2)])
    );
  });

  test(`${sport.name}: bracket games are the same games the schedule shows`, () => {
    const byId = Object.fromEntries(games.map((g) => [g.id, g]));
    for (const g of [...bracket.semifinals, bracket.final]) {
      assert.deepEqual(byId[g.id], g, `${g.id} is identical in the schedule and the bracket`);
    }
  });

  test(`${sport.name}: every team has a roster with unique jersey numbers`, () => {
    for (const id of teamIds) {
      const roster = rosters[sport.id]?.[id];
      assert.ok(roster && roster.length > 0, `${id} has players`);
      assert.equal(new Set(roster.map((p) => p.number)).size, roster.length, `${id} jersey numbers are unique`);
      assert.ok(roster.every((p) => p.name && p.position), `${id} players have names and positions`);
    }
  });
}
