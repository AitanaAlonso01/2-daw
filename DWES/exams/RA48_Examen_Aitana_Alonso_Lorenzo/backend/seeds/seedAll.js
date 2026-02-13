const userModel = require("../models/user.model")
const productModel = require("../models/product.model")
const orderModel = require("../models/order.model")
const mongodbConfig = require("../utils/mongodb.config")

const ejecutar = async () => {
    await mongodbConfig.conectarMongoDB()
        .then(() => console.log("✅ Conectado con MongoDB!!!"))
        .catch((err) => {
            console.log(`❌ Error al conectar. Desc: ${err}`)
            process.exit(0)
        })

    try {
        // Limpiar colecciones
        await Promise.all([
            userModel.deleteMany({}),
            productModel.deleteMany({}),
            orderModel.deleteMany({})
        ])
        console.log("🧹 Colecciones limpiadas")

        // ---------------- USERS ----------------
        const users = [
            {
                username: "jdoe",
                password: "password123",
                nombre: "John",
                apellido: "Doe",
                email: "jdoe@example.com",
                profile: "ADMIN"
            },
            {
                username: "asmith",
                password: "securepassword",
                nombre: "Anna",
                apellido: "Smith",
                email: "asmith@example.com"
            },
            {
                username: "bwhite",
                password: "mypassword",
                nombre: "Brian",
                apellido: "White",
                email: "bwhite@example.com"
            }
        ]

        const insertedUsers = await userModel.insertMany(users)
        console.log(`👤 ${insertedUsers.length} usuarios insertados`)

        // ---------------- PRODUCTS ----------------
        const products = [
            {
                nombre: "Laptop ARM",
                detalles: "Portátil con procesador ARM, ideal para desarrollo ligero",
                precio: 650,
                categoria: "tecnologia",
                stock: 10
            },
            {
                nombre: "Auriculares Inalámbricos",
                detalles: "Auriculares con cancelación de ruido y batería de larga duración",
                precio: 150,
                categoria: "otros",
                stock: 25
            },
            {
                nombre: "Smartwatch Deportivo",
                detalles: "Reloj inteligente resistente al agua con monitoreo de actividad",
                precio: 200,
                categoria: "deportes",
                stock: 15
            }
        ]

        const insertedProducts = await productModel.insertMany(products)
        console.log(`📦 ${insertedProducts.length} productos insertados`)

        // ---------------- ORDERS ----------------
        const orders = [
            {
                user: insertedUsers[0]._id, // John Doe
                items: [
                    { product: insertedProducts[0]._id, quantity: 1, price: insertedProducts[0].precio },
                    { product: insertedProducts[1]._id, quantity: 2, price: insertedProducts[1].precio }
                ],
                totalAmount: insertedProducts[0].precio * 1 + insertedProducts[1].precio * 2,
                shippingAddress: {
                    fullName: "John Doe",
                    address: "Calle Mayor 123",
                    city: "Madrid",
                    postalCode: "28013",
                    country: "España"
                },
                paymentMethod: "card",
                paymentStatus: "paid",
                orderStatus: "processing",
                notes: "Entregar antes de las 14:00"
            },
            {
                user: insertedUsers[1]._id, // Anna Smith
                items: [
                    { product: insertedProducts[2]._id, quantity: 1, price: insertedProducts[2].precio }
                ],
                totalAmount: insertedProducts[2].precio,
                shippingAddress: {
                    fullName: "Anna Smith",
                    address: "Av. Diagonal 45",
                    city: "Barcelona",
                    postalCode: "08001",
                    country: "España"
                },
                paymentMethod: "paypal",
                paymentStatus: "pending",
                orderStatus: "pending"
            },
            {
                user: insertedUsers[2]._id, // Brian White
                items: [
                    { product: insertedProducts[1]._id, quantity: 3, price: insertedProducts[1].precio },
                    { product: insertedProducts[0]._id, quantity: 1, price: insertedProducts[0].precio }
                ],
                totalAmount: insertedProducts[1].precio * 3 + insertedProducts[0].precio,
                shippingAddress: {
                    fullName: "Brian White",
                    address: "Calle del Río 87",
                    city: "Valencia",
                    postalCode: "46001",
                    country: "España"
                },
                paymentMethod: "cash_on_delivery",
                paymentStatus: "pending",
                orderStatus: "shipped",
                notes: "Llamar antes de entregar"
            }
        ]

        const insertedOrders = await orderModel.insertMany(orders)
        console.log(`🧾 ${insertedOrders.length} pedidos insertados`)

        console.log("🌱 Seed completada con éxito ✅")
    } catch (error) {
        console.log("❌ Error durante la seed:", error)
    }

    process.exit()
}

ejecutar()
