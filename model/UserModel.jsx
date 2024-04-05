import { Schema, model, models } from "mongoose"

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Must provide username"],
		},
		email: {
			type: String,
			required: [true, "Must provide email"],
			unique: [true, "Already exist"],
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Must provide password"],
			minlength: 6,
			select: false,
			trim: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
			trim: true,
			lowercase: true,
		},
	},
	{
		timestamps: true,
	}
)

const User = models.User || model("User", UserSchema)

export default User
