import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Account, User as AuthUser } from "next-auth"
import connectDB from "@/libs/connectDB"
import User from "@/model/UserModel"
import bcrypt from "bcrypt"

export const authOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				await connectDB()
				try {
					const user = await User.findOne({ email: credentials.email })
					if (user) {
						const match = await bcrypt.compare(credentials.password, user.password)
						if (match) {
							return user
						}
					}
				} catch (error) {
					throw new Error(error)
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider == "credentials") {
				return true
			}
		},
	},
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
