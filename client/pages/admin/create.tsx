import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { Form, Button, TextArea, Input } from 'semantic-ui-react'
import Layout from '@components/Layout/Layout'
import { AddAvocado } from '@service/graphql'

export type FormCreateAvocado = {
  name: string,
  image: File|null,
  sku: string,
  price: Number,
  description: string,
  taste: string,
  shape: string,
  hardiness: string
}

export default function Create() {
  const imageRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [addAvocado, { data, loading }] = useMutation(AddAvocado)
  const [formState, setFormState] = useState<FormCreateAvocado>({
    name: '',
    image: null,
    sku: '',
    price: 0,
    description: '',
    taste: '',
    shape: '',
    hardiness: '',
  })
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setFormState((prev) => {
      return {
        ...prev,
        [ev.target.name]: ev.target.value,
      }
    })
  }
  const imageChange=(ev:React.FormEvent<HTMLInputElement>)=>{
    const files = ev.currentTarget.files
    if(!files){
       return
    }
    setFormState((prev) => {
      return {
        ...prev,
        image: files[0],
      }
    })
  }
  const submitForm=(ev:React.FormEvent<HTMLFormElement>)=>{
    ev.preventDefault();

    const {image,name,price,sku,description,shape,taste,hardiness}=formState

    if (image && image.name && name && price && sku) {
      addAvocado({
        variables: {
          dto: {
            image: '/images/' + image.name,
            name,
            price: Number(price),
            sku,
            description,
            shape,
            taste,
            hardiness,
          },
        },
      })
      router.push('/')
    }
  }
  return (
    <Layout title={'Create Avocado'}>
      <h1>Create Avocado</h1>
      <Form onSubmit={submitForm} loading={loading}>
        <Form.Field required>
          <Form.Input
            label="Name"
            placeholder="Name"
            onChange={handleChange}
            name="name"
            value={formState.name}
            id="name"
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="image">Image</label>
          <Button
            content="Choose an Image"
            labelPosition="left"
            icon="file"
            onClick={() => imageRef?.current?.click()}
          />
          <input
            ref={imageRef}
            type="file"
            name="image"
            hidden
            id="image"
            onChange={imageChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="description">Description</label>
          <TextArea
            onChange={handleChange}
            name="description"
            id="description"
            value={formState.description}
          />
        </Form.Field>
        <Form.Field required>
          <Form.Input
            label="Hardiness"
            placeholder="Hardiness"
            onChange={handleChange}
            name="hardiness"
            value={formState.hardiness}
            id="hardiness"
          />
        </Form.Field>
        <Form.Field required>
          <Form.Input
            label="Taste"
            placeholder="Taste"
            onChange={handleChange}
            name="taste"
            value={formState.taste}
            id="taste"
          />
        </Form.Field>
        <Form.Field required>
          <Form.Input
            label="Shape"
            placeholder="Shape"
            onChange={handleChange}
            name="shape"
            value={formState.shape}
            id="shape"
          />
        </Form.Field>
        <Form.Field required>
          <Input
            label="SKU"
            placeholder="Sku"
            onChange={handleChange}
            name="sku"
            value={formState.sku}
            id="sku"
          />
        </Form.Field>
        <Form.Field required>
          <Form.Input
            placeholder="Price"
            label="Price"
            onChange={handleChange}
            name="price"
            value={formState.price}
            id="price"
            type="number"
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </Layout>
  )
}
