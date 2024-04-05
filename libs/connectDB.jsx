import mongoose from "mongoose"

async function connectDB() {
	console.log(mongoose.connections[0].readyState)
	// 재접속 체크
	if (mongoose.connections[0].readyState === 1) {
		console.log("Already connected to MongoDB")
		return
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI)
		console.log("Connected to MongoDB")
	} catch (err) {
		console.log("Failed to connect to MongoDB", err)
	}
}

export default connectDB
