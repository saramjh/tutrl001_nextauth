import React from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const Dashboard = async () => {
	const session = await getServerSession()
	if (!session) {
		redirect("/login")
	}
	return (
		<div>
			<h1>Dashboard</h1>
			<h1>{session.user?.name}</h1>
			<h1>{session.user?.email}</h1>
		</div>
	)
}

export default Dashboard
