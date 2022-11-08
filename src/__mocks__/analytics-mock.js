const setupAnalyticsMock = (identifyMockFn, trackMockFn, resetFn, pageFn) => {
  const analytics = {
    identify: identifyMockFn,
    track: trackMockFn,
    reset: resetFn,
    page: pageFn
  }
  global.window.analytics = analytics
}

export default setupAnalyticsMock
