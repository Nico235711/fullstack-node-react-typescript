import request from 'supertest'
import server from '../../server'

// testeando mi metodo de post (creación)
describe("POST /api/products", () => {
  it("Should display validations errors", async () => {
    const response = await request(server).post("/api/products").send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(4)

  })
  it("Should validate that the price not be zero", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor HD de 50 pulgadas - testing",
      price: -1000
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
  })
  it("Should validate that the price not be zero and It is a number", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor HD de 50 pulgadas - testing",
      price: "hola"
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(2)
  })

  it("Should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor HD de 50 pulgadas - testing",
      price: 1000
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("data")

    expect(response.status).not.toBe(404)
    expect(response.body).not.toHaveProperty("error")
  })
})

describe("GET /api/products", () => {
  it("Show a JSON response with products", async () => {
    const response = await request(server).get("/api/products")
    expect(response.status).toBe(200)
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.body).toHaveProperty("data")
  })
})

describe("GET /api/products/:id", () => {
  it("Should return 404 response for a non-existent product", async () => {
    const productId = 1000
    const response = await request(server).get(`/api/products/${productId}`)
    expect(response.status).toBe(404)
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.body).toHaveProperty("error")
  })

  it("Should check a valid ID in the URL", async () => {
    const response = await request(server).get(`/api/products/not-url-valid`)
    expect(response.status).toBe(400)
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.body).toHaveProperty("errors")
  })

  it("GET a single product", async () => {
    const response = await request(server).get(`/api/products/1`)
    expect(response.status).toBe(200)
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.body).toHaveProperty("data")
  })
})

describe("PUT /api/products/:id", () => {
  it("Should display validation error messages when updating a product", async () => {
    const response = await request(server).put("/api/products/1").send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(5)

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty("data")
  })
})

describe("DELETE /api/products/:id", () => {
  it("Should check a valid ID", async () => {
    const response = await request(server).delete("/api/products/not-valid-id")
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors[0].msg).toBe("ID no válido")
  })
  it("Should display a 404 response", async () => {
    const response = await request(server).delete("/api/products/2000")
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("Producto no encontrado")
  })
  it("Should delete a product", async () => {
    const response = await request(server).delete("/api/products/1")
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("data")
  })
})

