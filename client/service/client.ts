
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { baseURL } from '@utils/getBaseURL'

export const apolloClient = new ApolloClient({
  uri: `${baseURL}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          avocado: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'Avocado',
                id: args?.id,
              })
            },
          },
        },
      },
    },
  }),
})
