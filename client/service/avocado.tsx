import { gql } from '@apollo/client'

export const AddAvocado = gql`
  mutation AddAvocado($dto: CreateAvocadoDto) {
      addAvocado(dto: $dto){
        ...Avocado
      }
  }
`

