import styled from '@emotion/styled'

export const Video = styled.video`
  width: 100%;
  object-fit: cover;
  object-position: center;
`

export const VideoContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background-color: 'background';
`

export const VideoButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;

  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  > svg {
    margin: 0 auto;
    display: block;
  }
`

export const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 60;
`

export const Loader = styled.div`
  border: 4px solid;
  border-color: 'primary';
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
