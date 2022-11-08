export const setupMockLocalStorage = () => {
  const storage = {}

  const localStorageMock = {
    getItem: jest.fn(itemName => storage[itemName]),
    setItem: jest.fn((itemName, item) => (storage[itemName] = item)),
    removeItem: jest.fn(),
    clear: jest.fn()
  }

  global._localStorage = localStorageMock
}
