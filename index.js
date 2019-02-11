const feathers = require("@feathersjs/feathers")
const express = require("@feathersjs/express")

const app = express(feathers())

app.use(express.json())
app.configure(express.rest())

app.use("todos", {
  async get(name) {
    console.log("GET TODOS", name)
    return { name, createdAt: Date.now() }
  },
  async find() {
    throw new Error("Error find")
    return []
  },
  async create(data) {
    return data
  }
})

const addCreatedAt = fieldName => ctx => {
  ctx.data[fieldName] = Date.now()
  return ctx
}

const logger = ctx => {
  console.log("id", ctx.id)
  console.log("data", ctx.data)
  console.log("result", ctx.result)
  console.log("params", ctx.params)
  return ctx
}

const _cacheTodos = {}

const readFromCache = ctx => {
  if (_cacheTodos[ctx.id]) {
    ctx.result = { ..._cacheTodos[ctx.id], fromCache: true }
  }
  return ctx
}
const writeToCache = ctx => {
  _cacheTodos[ctx.id] = ctx.result
  return ctx
}

app.service("todos").hooks({
  before: {
    all: [logger],
    create: [addCreatedAt("createdAt"), addCreatedAt("updatedAt")],
    get: [readFromCache]
  },
  // db
  after: {
    create(context) {
      context.result.url = "goog.com"
      //console.log("after context: ", context)
      return context
    },
    get: [writeToCache]
  }
})
app.use(express.errorHandler())

app.listen(3000, () => console.log("Escuchando..."))
