import React, { useEffect, useRef, useState } from 'react'
import PlayVideoButtonIcon from '~/assets/images/icons/video-player.svg'
import {
  Loader,
  LoaderContainer,
  Video,
  VideoButton,
  VideoContainer
} from './styles'

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null)

  const [render, setRender] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [metadataLoaded, setMetadataLoaded] = React.useState(false)

  const togglePlaying = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  useEffect(() => {
    // The reference for cleanup
    const ref = videoRef

    // Use intersection observer to pause the video when it goes off screen.
    if (ref.current && window.IntersectionObserver) {
      const visibleTreshold = 0.5

      const options = {
        root: null, // viewport for checking target visibility - we use 'null' to target the window.
        rootMargin: '0px',
        threshold: visibleTreshold // if < 50% of the element is viewable, triggers callback.
      }

      const playBackObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio < visibleTreshold && isPlaying) {
            ref.current.pause()
          }
        })
      }, options)

      playBackObserver.observe(ref.current)

      // cleanup
      return () => {
        if (ref.current) {
          playBackObserver.unobserve(ref.current)
        }
        playBackObserver.disconnect()
      }
    }
  }, [isPlaying, render])

  useEffect(() => {
    setRender(true)
  }, [])

  if (render) {
    return (
      <VideoContainer>
        {!metadataLoaded && (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}

        {!isPlaying && metadataLoaded && (
          <VideoButton role="button" onClick={togglePlaying}>
            <PlayVideoButtonIcon />
          </VideoButton>
        )}

        <Video
          ref={videoRef}
          playsInline
          muted
          controls={isPlaying}
          controlsList="nodownload"
          onPlay={() => setIsPlaying(true)}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={() => setMetadataLoaded(true)}
          preload="metadata"
        >
          <source src={`${url}#t=0.1`} type="video/mp4" />
        </Video>
      </VideoContainer>
    )
  } else {
    return null
  }
}

export default VideoPlayer
