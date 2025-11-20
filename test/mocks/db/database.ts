interface MockedQuery<T = unknown> {
    [query: string]: () => Error | T;
}

let mockedQueries: MockedQuery = {};

export function withMockedQuery<T = unknown>(query: string, result: () => Error | T): void {
    mockedQueries[query] = result;
}

export function executeMockedQuery(query: string) {
    return mockedQueries[query]();
}

export function resetMockedQueries() {
    mockedQueries = {};
}
