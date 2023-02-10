import { requester } from './getBaseURL'

export const getAvocados = async () => {
  const query = `
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
  const response = await requester.post<{ data: TProduct[] }>('/graphql', {
    query,
  }).then((resp)=>resp.data.data)
  return response
}
