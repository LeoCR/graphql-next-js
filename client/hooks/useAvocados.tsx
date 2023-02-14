import { gql, useQuery } from '@apollo/client'

export const useAvocados = () => {
  const query = gql`
    query {
      avocados {
        id
        image
        name
        createdAt
        sku
        price
        attributes {
          description
          taste
          shape
          hardiness
        }
      }
    }
  `
  return useQuery(query)
}
export const useAvocado = (id:string|number) => {
  const query = gql`
    query GetAvocado($avocadoId:ID!){
      avocado(id: $avocadoId) {
        id
        image
        name
        createdAt
        sku
        price
        attributes {
          description
          taste
          shape
          hardiness
        }
      }
    }
  `
  return useQuery(query, {
    variables: {
      avocadoId:id
    },
  })
}
