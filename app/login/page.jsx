"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const isValidEmail = (email) => {
	const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return res.test(String(email).toLowerCase())
}

export default function Login() {
	const [error, setError] = useState("")
	const { data: session, status: sessionStatus } = useSession()
	const router = useRouter()
	const handleSubmit = async (e) => {
		e.preventDefault()
		const email = e.target[0].value
		const password = e.target[1].value
		console.log(email, password)

		if (!email || !password) {
			setError("Please fill in all fields")
		}

		if (!isValidEmail(email)) {
			setError("Invalid email")
			return
		}
		if (!password || password.length < 6) {
			setError("Password must be at least 6 characters")
			return
		}

		const result = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})

		if (result.status === 200) {
			setError("Login successful")
		}
		if (result.status === 401) {
			setError("Invalid email or password")
		}
		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		})

		if (res?.error) {
			setError("Invalid email or password")
			if (res?.url) router.replace("/dashboard")
		} else {
			setError("")
		}
	}

	return (
		<main className="flex flex-col justify-center w-fit mx-auto pt-10 bg-white p-10 mt-6 rounded-lg shadow-md">
			<div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
				<h1 className="text-3xl font-semibold text-center text-purple-700">Login</h1>
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text  text-xs">Email</span>
						</div>
						<input type="email" placeholder="Email Address" className="input input-bordered w-full max-w-xs" required />
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text text-xs">Password</span>
						</div>
						<input type="password" placeholder="Enter Password" className="input input-bordered w-full max-w-xs" required />
						<div className="label">
							<Link href={"/"}>
								<span className="label-text-alt text-gray-500 hover:text-black">Forget Password?</span>
							</Link>
						</div>
					</label>
					<button type="submit" className="w-full btn btn-neutral">
						Login
					</button>
					<p className="text-red-600 text-[16px] mb-4">{error && error}</p>
				</form>
				<h1 className="text-center my-6">- OR -</h1>
				<div>
					<Link href={"/"} className="hover:text-gray-500 ">
						<h1 className="w-full btn btn-primary">Register Here</h1>
					</Link>
				</div>
			</div>
		</main>
	)
}
