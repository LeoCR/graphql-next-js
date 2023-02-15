import { Segment, Header, Button } from 'semantic-ui-react'

import { removeToken, User } from '@service/auth'

import Layout from '@components/Layout/Layout'
import { AddAvocado } from '@service/graphql';
import { useMutation } from '@apollo/client'

function Profile({ user }: { user: User }) {
  const [addAvocado, { data, loading }] = useMutation(AddAvocado)

  const logout = async () => {
    await removeToken()
    window.location.reload()
  }
  const addNew = () => {
    addAvocado({
      variables: {
        dto: {
          image: 'http://localhost:3000/images/reed.jpg',
          name: 'Reed',
          price: 6,
          sku: 'REED',
        },
      },
    })
    console.log('data=>', data)
  }
  return (
    <Layout title="Hola">
      <div className="mt-14" />
      <Header as="h2" size="huge" className="">
        Hola, {user.username}
      </Header>
      <Segment>
        <p>
          Si estás viendo esto es porque has iniciado sesión de forma correcta.
        </p>
        <Button type="button" positive onClick={addNew}>
          Agregar nuevo avocado...
        </Button>{' '}
        <Button type="button" basic color="red" onClick={logout}>
          Logout
        </Button>
      </Segment>
      <div className="mb-20" />
    </Layout>
  )
}

export default Profile
