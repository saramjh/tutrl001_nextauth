import Link from "next/link"

export default function Login() {
	return (
		<main className="flex flex-col justify-center w-fit mx-auto pt-10 bg-white p-10 mt-6 rounded-lg shadow-md">
			<div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
				<h1 className="text-3xl font-semibold text-center text-purple-700">Login</h1>
			</div>
			<div>
				<form>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text  text-xs">Email</span>
						</div>
						<input type="email" placeholder="Email Address" className="input input-bordered w-full max-w-xs" />
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text text-xs">Password</span>
						</div>
						<input type="password" placeholder="Enter Password" className="input input-bordered w-full max-w-xs" />
						<div className="label">
							<Link href={"/"}>
								<span className="label-text-alt text-gray-500 hover:text-black">Forget Password?</span>
							</Link>
						</div>
					</label>
					<button type="submit" className="w-full btn btn-neutral">
						Login
					</button>
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
