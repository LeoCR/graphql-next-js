import React, { useState } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useQuery } from '@apollo/client'
import { Button, Card } from 'semantic-ui-react'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import { useAvocado } from '@hooks/useAvocados'
import { Avocado, GetAllAvos } from 'service/graphql'
import { apolloClient } from 'service/client'
export const ChildComponent=()=>{
  const { loading,  data } = useAvocado(1)

  if (loading ) {
    return <>Loading...</>
  }
  console.log('Single Avocado ', data)
  return(<>Moaunted</>)
}
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
  const [isEnabled,setIsEnabled]= useState(false)

  console.log('avocados', avocados)
  return (
    <Layout title="Home">
      <KawaiiHeader />
      <Button color="red" onClick={() => setIsEnabled(!isEnabled)}>
        Set Enabled
      </Button>
      {isEnabled && <ChildComponent />}
      <Card.Group itemsPerRow={2} centered>
        {avocados.map((avo) => (
          <Card
            key={avo.id}
            href={'/product/'+avo.id}
            header={avo.name}
            meta={avo.attributes?.hardiness}
            description={avo.attributes?.description}
          />
        ))}
      </Card.Group>
    </Layout>
  )
}

const documentationList = [
  {
    title: 'Documentación Proyecto',
    meta: 'Proyecto',
    description:
      '¿Tienes dudas sobre este proyecto? Aquí encuentras la documentación para configurar todo. Aségurate de leerlo.',
    link: 'https://github.com/jonalvarezz/platzi-graphql-fullstack',
  },
  {
    title: 'Documentación Next.js',
    meta: 'Documentación',
    description:
      'Aquí encuentras la documentación sobre el framework base con el que realizaremos todo.',
    link: 'https://nextjs.org/docs/getting-started',
  },
  {
    title: 'Documentación GraphQL',
    meta: 'Documentación',
    description:
      'Nuestra aplicación conecta a Contenful para leer todo el contenido que mostraremos. Contenful provee la capa de GraphQL.',
    link: 'https://graphql.org/learn/',
  },
  {
    title: 'Curso de GraphQL con Node.js',
    meta: 'Proyecto',
    description:
      'Revisa el curso en donde creamos todo el backend y la API para este proyecto.',
    link: 'https://platzi.com/cursos/graphql-nodejs/',
  },
]

export default HomePage
