import connectDB from "@/libs/connectDB"
import User from "@/model/UserModel"
import { NextResponse } from "next/server"

export async function POST(req) {
	const newUsrData = await req.json()
	await connectDB()
	console.log(newUsrData)
	const res = User.create(newUsrData)
	return NextResponse.json(res, { status: 201 })
}
