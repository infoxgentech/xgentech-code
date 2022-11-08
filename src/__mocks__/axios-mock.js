const axios = jest.requireActual('axios')

module.exports = {
  ...axios,
  get: jest.fn(() => Promise.resolve({ data: { data: [{}] } })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  patch: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  interceptors: {
    response: {
      use: jest.fn(() => {})
    },
    request: {
      use: jest.fn(() => {})
    }
  },
  defaults: {
    transformResponse: [],
    transformRequest: []
  },
  create: jest.fn(() => {
    return {
      get: jest.fn(() => Promise.resolve({ data: {} })),
      post: jest.fn(() => Promise.resolve({ data: {} })),
      patch: jest.fn(() => Promise.resolve({ data: {} })),
      put: jest.fn(() => Promise.resolve({ data: {} })),
      delete: jest.fn(() => Promise.resolve({ data: {} })),
      interceptors: {
        response: {
          use: jest.fn(() => {})
        },
        request: {
          use: jest.fn(() => {})
        }
      },
      defaults: {
        transformResponse: [],
        transformRequest: []
      }
    }
  })
}
