describe('URL Hooks', () => {
  const { registerVisit, removeVisit } = require('./index')
  const fakeService = {
    create: jest.fn(),
    remove: jest.fn()
  }
  const fakeApp = {
    service() {
      return fakeService
    }
  }
  const ctx = {
    app: fakeApp
  }
  describe('registerVisit', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })

    it('it calls `create` method on `visits` service', async () => {
      fakeService.create.mockImplementation(() => {
        return Promise.resolve()
      })

      const testCtx = {
        ...ctx,
        result: 'CREATE_OK'
      }
      const result = await registerVisit(testCtx)
      const fn = fakeService.create
      expect(fn).toBeCalledWith({
        url: 'CREATE_OK'
      })
      expect(fn).toHaveBeenCalledTimes(1)
      expect(result).toBe(testCtx)
    })

    it('if create call throws, it returns a rejected promise', async () => {
      fakeService.create.mockRejectedValue(new Error('Error from create'))

      await expect(registerVisit(ctx)).rejects.toThrow(/create/)
    })
  })

  describe('removeVisit', () => {
    it('it calls remove visit and set result to true', async () => {
      fakeService.remove.mockResolvedValue(true)
      const newContext = await removeVisit({ ...ctx, result: 'url.com' })
      expect(newContext).toHaveProperty('result', true)
      expect(fakeService.remove).toBeCalledWith({ url: 'url.com' })
    })
  })
})
