import React from 'react'

// Libraries
import styled from 'styled-components'
import emotion from '@emotion/styled'

// Utils
import { flexbox, type FlexboxProps } from '../functions'
import { render, screen } from '@testing-library/react'

// Components
const StyledComponentsInterpolation = styled('div')<FlexboxProps>`
  ${flexbox}
`

const StyledComponentsObject = styled('div')<FlexboxProps>(flexbox)

const EmotionInterpolation = emotion('div')<FlexboxProps>`
  ${flexbox}
`

const EmotionObject = emotion('div')<FlexboxProps>(flexbox)

// Children

const children = {
  styledComponentsInterpolation: 'styledComponentsInterpolation',
  styledComponentsObject: 'styledComponentsObject',
  emotionInterpolation: 'emotionInterpolation',
  emotionObject: 'emotionObject'
}

/*




*/

export const TestComponents: React.FC = () => {
  const props: FlexboxProps = {
    flex: 'content',
    alignItems: ['baseline', 'center'],
    justifyContent: { _: 'flex-end', sm: 'end' }
  }

  return (
    <>
      <StyledComponentsInterpolation {...props} style={{ color: 'green' }}>
        <>{children.styledComponentsInterpolation}</>
      </StyledComponentsInterpolation>

      <StyledComponentsObject {...props}>
        <>{children.styledComponentsObject}</>
      </StyledComponentsObject>

      <EmotionInterpolation {...props}>
        <>{children.emotionInterpolation}</>
      </EmotionInterpolation>

      <EmotionObject {...props}>
        <>{children.emotionObject}</>
      </EmotionObject>
    </>
  )
}

describe('Mounting tests', () => {
  beforeEach(() => {
    render(<TestComponents />)
  })

  it('mounts styled-components interpolation', () => {
    expect(screen.getByText(children.styledComponentsInterpolation)).toBeInTheDocument()
  })

  it('mounts styled-components object', () => {
    expect(screen.getByText(children.styledComponentsObject)).toBeInTheDocument()
  })

  it('mounts emotion interpolation', () => {
    expect(screen.getByText(children.emotionInterpolation)).toBeInTheDocument()
  })

  it('mounts emotion object', () => {
    expect(screen.getByText(children.emotionObject)).toBeInTheDocument()
  })
})
