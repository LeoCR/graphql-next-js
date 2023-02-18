import React from 'react'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { apolloClient } from '@service/client'
import { GetAllAvos, GetAvo, Avocado } from '@service/graphql'
import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await apolloClient.query({ query: GetAllAvos })
  const data = response?.data.avocados
  const paths = data?.map((avocado: Avocado) => {
    if (avocado == null) {
      console.error(`An avocado entry with no data was found at index`)
    }

    return { params: { id: avocado.id } }
  })

  return {
    paths,
    // Pre-renderice las paginas anteriores y para toda nueva página nueva
    // intente generarla desde el servidor bajo demanda
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<{ product: Avocado }> = async ({
  params,
}) => {
  try {
    const response = await apolloClient.query({
      query: GetAvo,
      variables: { avocadoId: params?.id as string },
    })

    if (response.data.avocado == null) {
      throw new Error(`Item with id ${params?.id} was not found.`)
    }

    // Pass post data to the page via props
    return { props: { product: response.data.avocado } }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

const ProductPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={product.name}>
      <ProductSummary product={product as any} />
    </Layout>
  )
}

export default ProductPage
