import { useQuery } from '@tanstack/react-query'
import { getAvocados } from '@utils/getAvocados';

export const useAvocados = () => {
   return useQuery({
     queryKey: ['avocados'],
     queryFn: async () => await getAvocados(),
   })
}
