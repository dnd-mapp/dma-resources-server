import { resetMockedQueries } from './database';
import { mockSpellDB } from './spells';

export function resetDatabases() {
    mockSpellDB.reset();
    resetMockedQueries();
}
