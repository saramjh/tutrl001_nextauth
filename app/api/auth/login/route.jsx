import connectDB from "@/libs/connectDB"
import User from "@/model/UserModel"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

const saltRounds = 10

export async function POST(req) {
	const { email, password } = await req.json()

	await connectDB()

	const existingUser = await User.findOne({ email }, { password: 1 })
	if (!existingUser) {
		NextResponse.json({ message: "This email is not registered" })
	}

	const validPassword = await bcrypt.compare(password, existingUser.password)
	if (validPassword) {
		return NextResponse.json({ message: "This it the right password" }, { status: 200 })
	} else {
		return NextResponse.json({ message: "This is the wrong password" }, { status: 401 })
	}
}
