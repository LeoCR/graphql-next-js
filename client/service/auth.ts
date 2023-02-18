import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import {baseURL} from '@utils/getBaseURL'


const TOKEN_KEY = '_token_'

/**
 * ⚠️ Atención
 *
 * Esta es una capa de autenticación basada totalmente en el cliente.
 *
 * El token JWT es guardado como es en SessionStorage.
 *
 * Una vez se cierre la ventana del navegador la sesión desaparecerá.
 *
 * Esta implementación solo fue hecha por propósitos académicos.
 *
 * En un ambiente real, el token debería guardarse en el servidor y configurar
 * una cookie segura que haga las veces de sesión. Esto se puede lograr con Next.js y su capa
 * de APIs sin necesidad de tocar la API GraphQL/Express.
 *
 * Alternativamente, se podría guardar el token en un Service Worker.
 *
 * Si quieres conocer más sobre los riesgos, e implicaciones te invito a ver:
 * - https://platzi.com/cursos/nextjs-owasp/
 * - https://platzi.com/cursos/nextjs-auth/
 */

export function useLogin({ onDone }: { onDone: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = event.currentTarget.username.value
    const password = event.currentTarget.pass.value

    try {
      setIsLoading(true)
      setMessage('')
      const response = await fetch(`${baseURL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      })

      if (!response.ok) {
        throw new Error(
          `Failed authenticating with HTTP status ${response.status}`
        )
      }

      const data = await response.json()
      if (data && typeof data.access_token === 'string') {
        await saveToken(data.access_token)
        onDone()
        return
      }

      throw new Error(`No token found in the response`)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
      setMessage('Usuario o contraseña inválidos')
    }
  }

  return {
    isLoading,
    message,
    login,
  }
}

function saveToken(token: string) {
  return new Promise<string>((resolve) => {
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(TOKEN_KEY, token)
      }
      resolve(token)
    } catch (e) {
      throw new Error(
        'El token no se guardó. ¿Estás en modo incógnito? – Asegúrate que SessionStorage esté habilitado para esta página'
      )
    }
  })
}

export function retrieveToken() {
  return new Promise<string | null>((resolve) => {
    let token=null
    if (typeof window !== 'undefined') {
      token = window.sessionStorage.getItem(TOKEN_KEY)
    }
    resolve(token)
  })
}

export function removeToken() {
  return new Promise<void>((resolve) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(TOKEN_KEY)
    }
    resolve()
  })
}

export type User = { username: string; id: string }

export function useFetchCurrentUser() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const validateAsync = async () => {
      try {
        setStatus('loading')

        // Check token first
        const token = await retrieveToken()
        if (!token) {
          //throw new Error('Please log in first')
        }

        const response = await fetch(`${baseURL}/api/v1/users/current`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          //throw new Error(`Unauthorized request`)
        }

        const data = await response.json()
        console.log('data', data)
        if (data && typeof data.email === 'string') {
          setStatus('success')
          setUser({ username: data.email, id: data.id })
          return
        }

        throw new Error('Unexpected data format')
      } catch (e) {
        setStatus('success')
        setUser(null)
      }
    }

    validateAsync()
  }, [])

  return { status, user }
}
