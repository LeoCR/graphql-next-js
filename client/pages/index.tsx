import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import {Card } from 'semantic-ui-react'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import { Avocado, GetAllAvos } from '@service/graphql'
import { apolloClient } from '@service/client'

export const getStaticProps:GetStaticProps<{avocados:Avocado[]}>=async()=>{
  const response = await apolloClient.query({
    query:GetAllAvos
  })
  if(response.data.avocados===null){
    return <>Failed</>
  }
  const avocados=response.data.avocados as Avocado[]
  return{
    props:{
      avocados
    }
  }
}
const HomePage = ({avocados}:InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log('avocados', avocados)
  return (
    <Layout title="Home">
      <KawaiiHeader />
      <Card.Group itemsPerRow={2} centered>
        {avocados.map((avo) => (
          <Card
            key={avo.id}
            href={'/product/'+avo.id}
            header={avo.name}
            meta={avo.attributes?.hardiness}
            description={avo.attributes?.description}
            image={avo.image}
          />
        ))}
      </Card.Group>
    </Layout>
  )
}

export default HomePage
