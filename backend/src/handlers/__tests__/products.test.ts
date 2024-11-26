import request from 'supertest'
import server from '../../server'

const URL = "/api/products"

describe("POST api/products", () => {
	it("Should display validation errors", async () => {
		const response = await request(server).post(URL).send({})

		expect(response.status).toBe(400)
		expect(response.body).toHaveProperty("errors")
	})

	it("Should create a new product", async () => {
		const response = await request(server).post(URL).send({
			"name": "Wireless Headphones",
			"price": 49.99
		})

		expect(response.status).toBe(201)
		expect(response.body).toHaveProperty("data")
	})
})

describe("GET api/products", () => {
	it("Should get a json with the products", async () => {
		const response = await request(server).get(URL)

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty("data")
	})
})

describe("GET api/products/:id", () => {
	it("Should get a json with the product using its id", async () => {
		const productID = 1
		const response = await request(server).get(`${URL}/${productID}`)

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty("data")
	})

	it("Should get a json with the error object when the product not exists", async () => {
		const notExistsProductID = 2000
		const response = await request(server).get(`${URL}/${notExistsProductID}`)

		expect(response.status).toBe(404)
		expect(response.body).toHaveProperty("error")
	})
})

describe("PUT api/products/:id", () => {

	it("Should get a json with the error object when i try update a product that not exists", async () => {
		const notExistsProductID = 2000
		const response = await request(server).put(`${URL}/${notExistsProductID}`).send({
			"name": "Wireless Headphones",
			"price": 49.99,
			"availability": false
		})

		expect(response.status).toBe(404)
		expect(response.body).toHaveProperty("error")
	})

	it("Should display validation errors", async () => {
		const productID = 1
		const response = await request(server).put(`${URL}/${productID}`).send({})

		expect(response.status).toBe(400)
		expect(response.body).toHaveProperty("errors")
	})

	it("Should get a json with the product updated using its id", async () => {
		const productID = 1
		const response = await request(server).put(`${URL}/${productID}`).send({
			"name": "Wireless Headphones - ACTUALIZADO",
			"price": 49.99,
			"availability": false
		})

		expect(response.status).toBe(200)
		expect(response.status).not.toBe(404)
		expect(response.body).toHaveProperty("data")
	})
})

describe("PATCH api/products/:id", () => {

	it("Should get a json with the error object when i try update a product that not exists", async () => {
		const notExistsProductID = 2000
		const response = await request(server).patch(`${URL}/${notExistsProductID}`)

		expect(response.status).toBe(404)
		expect(response.body).toHaveProperty("error")
	})

	it("Should get a json with the product's availability updated using its id", async () => {
		const productID = 1
		const response = await request(server).patch(`${URL}/${productID}`)

		expect(response.status).toBe(200)
		expect(response.status).not.toBe(404)
		expect(response.body).toHaveProperty("data")
	})
})

describe("DELETE api/products/:id", () => {

	it("Should get a json with the error object when i try to delete a product that not exists", async () => {
		const notExistsProductID = 2000
		const response = await request(server).delete(`${URL}/${notExistsProductID}`)

		expect(response.status).toBe(404)
		expect(response.body).toHaveProperty("error")
	})

	it("Should display validation error by id", async () => {
		const invalidateProductID = "not-url-valid"
		const response = await request(server).delete(`${URL}/${invalidateProductID}`)

		expect(response.status).toBe(400)
		expect(response.body.errors[0].msg).toContain("Id no válido")
	})

	it("Should get a json with the product deleted using its id", async () => {
		const productID = 1
		const response = await request(server).delete(`${URL}/${productID}`)

		expect(response.status).toBe(200)
		expect(response.status).not.toBe(404)
		expect(response.body).toHaveProperty("data")
	})
})