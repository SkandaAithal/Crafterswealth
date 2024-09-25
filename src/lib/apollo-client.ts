import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      credentials: "same-origin",
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            items: {
              merge(existing = [], incoming: any[]) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = mergeCache(existingCache, initialState);
    _apolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

function mergeCache(existingCache: any, incomingCache: any) {
  for (const key of Object.keys(incomingCache)) {
    if (!existingCache[key]) {
      existingCache[key] = incomingCache[key];
    } else {
      if (
        Array.isArray(existingCache[key]) &&
        Array.isArray(incomingCache[key])
      ) {
        existingCache[key] = [...existingCache[key], ...incomingCache[key]];
      } else if (
        typeof existingCache[key] === "object" &&
        typeof incomingCache[key] === "object"
      ) {
        existingCache[key] = mergeCache(existingCache[key], incomingCache[key]);
      }
    }
  }

  return existingCache;
}

const client = createApolloClient();
export default client;
