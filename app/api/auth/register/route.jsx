import connectDB from "@/libs/connectDB"
import User from "@/model/UserModel"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

const saltRounds = 10
const someOtherPlaintextPassword = "not_bacon"

export async function POST(req) {
	const newUsrData = await req.json()
	await connectDB()
	const { name, email, password } = newUsrData
	if (!name || !email || !password) return NextResponse.json({ message: "invalid data" })
	const hashed = await bcrypt.hash(password, saltRounds)
	User.create({ name, email, password: hashed })
	const validPassword = await bcrypt.compare(password, hashed)
	if (validPassword) {
		return NextResponse.json({ message: "This it the right password" })
	} else {
		return NextResponse.json({ message: "This is the wrong password" })
	}
}
