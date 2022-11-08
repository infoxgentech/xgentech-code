import styled from '@emotion/styled'

export const CarouselWrapper = styled.div`
  .carousel-root {
    .carousel {
      .slide {
        background: none;
      }
      .control-dots {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 0px;
        margin-bottom: 20px;
        > .dot {
          height: 10px;
          width: 10px;
          background: none;
          border: 2px solid white;
          box-shadow: none;
          opacity: 1;
          &.selected {
            background-color: #fff;
          }
        }
      }
    }
  }
`
