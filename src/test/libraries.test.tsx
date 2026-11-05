import React from 'react'
import { vi, type MockInstance } from 'vitest'

// Libraries
import styled, { StyleSheetManager } from 'styled-components'
import styledComponentsPackage from 'styled-components/package.json'
import emotion from '@emotion/styled'

// Utils
import {
  background,
  color,
  flexbox,
  space,
  type BackgroundProps,
  type ColorProps,
  type FlexboxProps,
  type SpaceProps
} from '../functions'
import { compose } from '../constructors'
import { shouldForwardProp } from '../helpers/shouldForwardProp'
import { render, screen } from '@testing-library/react'

// Types
type Props = FlexboxProps & SpaceProps & BackgroundProps & ColorProps

const styles = compose<Props>(flexbox, space, background, color)

// Components
const StyledComponentsInterpolation = styled('div').withConfig({ shouldForwardProp })<Props>`
  ${styles}
`

const StyledComponentsObject = styled('div').withConfig({ shouldForwardProp })<Props>(styles)

const StyledComponentsManager = styled('div')<Props>(styles)

const EmotionInterpolation = emotion('div')<FlexboxProps>`
  ${flexbox}
`

const EmotionObject = emotion('div')<FlexboxProps>(flexbox)

// Children

const children = {
  styledComponentsInterpolation: 'styledComponentsInterpolation',
  styledComponentsObject: 'styledComponentsObject',
  styledComponentsManager: 'styledComponentsManager',
  emotionInterpolation: 'emotionInterpolation',
  emotionObject: 'emotionObject'
}

const jynxAttributes = ['flex', 'alignItems', 'justifyContent', 'm', 'p', 'bg', 'color']

// StyleSheetManager only accepts shouldForwardProp from styled-components 6
const supportsManagerShouldForwardProp = !styledComponentsPackage.version.startsWith('5.')

/*




*/

export const TestComponents: React.FC = () => {
  const flexboxProps: FlexboxProps = {
    flex: 'content',
    alignItems: ['baseline', 'center'],
    justifyContent: { _: 'flex-end', sm: 'end' }
  }

  const props = {
    ...flexboxProps,
    m: 2,
    p: '4px',
    bg: 'blue',
    color: 'red'
  } satisfies Props

  return (
    <>
      <StyledComponentsInterpolation {...props} style={{ color: 'green' }}>
        <>{children.styledComponentsInterpolation}</>
      </StyledComponentsInterpolation>

      <StyledComponentsObject {...props}>
        <>{children.styledComponentsObject}</>
      </StyledComponentsObject>

      <StyleSheetManager {...{ shouldForwardProp }}>
        <StyledComponentsManager {...props}>
          <>{children.styledComponentsManager}</>
        </StyledComponentsManager>
      </StyleSheetManager>

      <EmotionInterpolation {...flexboxProps}>
        <>{children.emotionInterpolation}</>
      </EmotionInterpolation>

      <EmotionObject {...flexboxProps}>
        <>{children.emotionObject}</>
      </EmotionObject>
    </>
  )
}

describe('Mounting tests', () => {
  let consoleError: MockInstance
  let consoleWarn: MockInstance

  // React only warns once per unknown prop name, so spy before the first render
  beforeAll(() => {
    consoleError = vi.spyOn(console, 'error')
    consoleWarn = vi.spyOn(console, 'warn')
  })

  beforeEach(() => {
    render(<TestComponents />)
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('mounts styled-components interpolation', () => {
    expect(screen.getByText(children.styledComponentsInterpolation)).toBeInTheDocument()
  })

  it('mounts styled-components object', () => {
    expect(screen.getByText(children.styledComponentsObject)).toBeInTheDocument()
  })

  it('mounts styled-components with StyleSheetManager', () => {
    expect(screen.getByText(children.styledComponentsManager)).toBeInTheDocument()
  })

  it('mounts emotion interpolation', () => {
    expect(screen.getByText(children.emotionInterpolation)).toBeInTheDocument()
  })

  it('mounts emotion object', () => {
    expect(screen.getByText(children.emotionObject)).toBeInTheDocument()
  })

  it.each([
    children.styledComponentsInterpolation,
    children.styledComponentsObject,
    ...(supportsManagerShouldForwardProp ? [children.styledComponentsManager] : [])
  ])('does not forward jynx props to the DOM (%s)', text => {
    const element = screen.getByText(text)

    jynxAttributes.forEach(attribute => {
      expect(element).not.toHaveAttribute(attribute)
    })
  })

  it('keeps non-jynx props on styled-components elements', () => {
    expect(screen.getByText(children.styledComponentsInterpolation)).toHaveStyle({ color: 'rgb(0, 128, 0)' })
  })

  it('does not log unknown prop warnings', () => {
    expect(consoleError).not.toHaveBeenCalled()
    expect(consoleWarn).not.toHaveBeenCalled()
  })
})
