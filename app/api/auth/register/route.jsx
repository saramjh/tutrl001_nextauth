import connectDB from "@/libs/connectDB"
import User from "@/model/UserModel"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

const saltRounds = 10

export async function POST(req) {
	const { name, email, password } = await req.json()

	if (!name || !email || !password) return NextResponse.json({ message: "invalid data" }, { status: 400 })
	await connectDB()
	const existingUser = await User.findOne({ email })
	console.log(existingUser)

	if (existingUser) return NextResponse.json({ message: "Email already exists" }, { status: 400 })

	const hashed = await bcrypt.hash(password, saltRounds)
	User.create({ name, email, password: hashed })

	return NextResponse.json({ message: "Registration successful" }, { status: 200 })
}
