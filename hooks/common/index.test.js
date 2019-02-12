describe('Common hooks', () => {
  describe('validateRegEx', () => {
    const { validateRegEx } = require('./index')
    const errors = require('@feathersjs/errors')

    test('it throws if `exp` argument is missing', () => {
      expect(() => {
        const hook = validateRegEx({})
      }).toThrow(/Wrong arguments/)
    })

    test('it returns a function', () => {
      const hook = validateRegEx({
        exp: 'ddd',
        propName: 'fff',
        mssg: 'Error'
      })
      expect(hook).toBeInstanceOf(Function)
    })

    test('throws if regex test fails on data', () => {
      const hookFn = validateRegEx({
        exp: /a/,
        propName: 'name',
        mssg: 'BOOM'
      })
      const ctx = {
        data: {
          name: 'b'
        }
      }

      expect(() => {
        hookFn(ctx)
      }).toThrow(errors.NotAcceptable)
    })

    test('Returns same context if validation is OK', () => {
      const hookFn = validateRegEx({
        exp: /a/,
        propName: 'name',
        mssg: 'BOOM'
      })
      const ctx = {
        data: {
          name: 'aaaa'
        }
      }
      const result = hookFn(ctx)
      expect(result).toBe(ctx)
    })
  })
})
