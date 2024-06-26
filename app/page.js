"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

export default function Home() {
	const [error, setError] = useState("")
	const router = useRouter()
	const { data: session, status: sessionStatus } = useSession()

	const isValidEmail = (email) => {
		const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return res.test(String(email).toLowerCase())
	}

	useEffect(() => {
		if (sessionStatus === "authenticated") {
			router.replace("/dashboard")
		}
	}, [sessionStatus, router])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const name = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value

		if (!isValidEmail(email)) {
			setError("Invalid email")
			return
		}

		if (!password || password.length < 6) {
			setError("Password must be at least 6 characters")
			return
		}

		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			})
			if (res.status === 400) {
				setError("Email already exists")
			}
			if (res.status === 200) {
				setError("Registration successful")
				router.push("/login")
			}
		} catch (error) {
			console.log(error)
		}
	}
	if (sessionStatus === "loading") {
		return <h1>Loading...</h1>
	}

	return (
		sessionStatus !== "authenticated" && (
			<main className="flex flex-col justify-center w-fit mx-auto pt-10 bg-white p-10 mt-6  rounded-lg shadow-md">
				<div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
					<h1 className="text-3xl font-semibold text-center text-purple-700">Register</h1>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col justify-center space-y-2 mt-5">
					<label className="input input-bordered flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
							<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
						</svg>
						<input type="text" className="grow" placeholder="Username" required />
					</label>
					<label className="input input-bordered flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
							<path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
							<path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
						</svg>
						<input type="text" className="grow" placeholder="Email" required />
					</label>
					<label className="input input-bordered flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
							<path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
						</svg>
						<input type="password" placeholder="password" className="grow" required />
					</label>
					<button type="submit" className="btn btn-neutral">
						Register
					</button>
					<p className="text-red-600 text-[16px] mb-4">{error && error}</p>
				</form>
				<h1 className="text-center my-6">- OR -</h1>
				<div>
					<Link href={"/login"}>
						<h1 className="w-full btn btn-primary hover:bg-gray-500">Login with an existing account</h1>
					</Link>
				</div>
			</main>
		)
	)
}
