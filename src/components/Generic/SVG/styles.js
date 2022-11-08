import styled from '@emotion/styled'

export const SvgWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  > div {
    width: 75px;

    > svg path {
      fill: ${props => props.theme.colors[props.color]};
    }
  }
`
