import { ApolloClient, InMemoryCache,createHttpLink } from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import { baseURL } from '@utils/getBaseURL'
import { retrieveToken } from '@service/auth'

const apiLink = createHttpLink({
  uri: `${baseURL}/graphql`,
})

const authLink = setContext(async(_,{headers})=>{
  let extraHeader={}
  const token=await retrieveToken()
  extraHeader={
    Authorization: `Bearer ${token}`
  }
  return{
    headers:{
      ...headers,
      ...extraHeader
    }
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(apiLink),
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
