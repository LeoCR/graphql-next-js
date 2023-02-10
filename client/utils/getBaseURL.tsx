import axios from "axios"

export const baseURL = process.env.NEXT_PUBLIC_SERVICE_URL

export const requester = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
  },
})

export const apiURL='http://localhost:3001'
