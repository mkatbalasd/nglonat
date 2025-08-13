import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { Admin } from 'react-admin'
import mockDataProvider from './mockDataProvider'

const renderWithAdmin = (ui: ReactElement, options?: RenderOptions) =>
  render(<Admin dataProvider={mockDataProvider}>{ui}</Admin>, options)

export default renderWithAdmin
