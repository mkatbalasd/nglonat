import { setupServer } from 'msw/node'
import { HttpHandler as RestHandler } from 'msw'

export const handlers: RestHandler[] = []
export const server = setupServer(...handlers)

