/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const query = `
  query{
    avocados{
      id
      image
      name
      createdAt
      sku
      price
      attributes{
        description
        taste
        shape
        hardiness
      }
    }
  }
`

export const baseURL = process.env.NEXT_PUBLIC_SERVICE_URL

export const requester = axios.create({
  baseURL,
  headers: {
      'content-type': 'application/json',
  },
})

export const useAvocados = () => {
  return useQuery(['avocados'], async()=>{
      const response = await requester.post<{ data: TProduct[] }>('/graphql', {
        query,
      })
      return response.data.data
  })
}
