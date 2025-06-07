import PerfumeModel from "@/models/Perfume";
import UserModel from "@/models/User";
import { Perfume } from "@/types/perfume";
import { User } from "@/types/user";
import ReviewModel from "@/models/Review";

export const validateEmail = (email: string) => {
  const regextSt =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regextSt.test(email);
};

export const createUser = async (user: User) => {
  if (!user.name || !user.username || !user.email || !user.password) {
    throw new Error("Please fill all fields");
  }

  const userExists = await UserModel.findOne({ email: user.email });
  if (userExists) {
    throw new Error("Email already exists,Try another email");
  }

  if (!validateEmail(user.email)) {
    throw new Error("Invalid email");
  }

  if (user.password.length < 6 || user.password.length > 128) {
    throw new Error(
      "Password must be at least 6 characters and at most 128 characters"
    );
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  if (!passwordRegex.test(user.password)) {
    throw new Error(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }

  const newUser = new UserModel({
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
    picture:
      user.picture?.trim() !== ""
        ? user.picture
        : process.env.DEFAULT_PROFILE_PICTURE,
    role: "User",
    isVerified: false,
  });

  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const user = UserModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};



export const createPerfume = async (perfume: Perfume, id: string) => {
  const {
    name,
    description,
    price,
    image,
    brand,
    category,
    sizes,
    inStock,
  } = perfume;

  if (
    !name ||
    !description ||
    !price ||
    !image ||
    !brand ||
    !category ||
    !sizes
  ) {
    throw new Error("Please fill all the required fields");
  }

  if (typeof price !== "number" || price <= 0) {
    throw new Error("Price must be a positive number");
  }

  const newPerfume = new PerfumeModel({
    name,
    description,
    price,
    image,
    brand,
    category,
    sizes,
    inStock,
    createdBy: id,
  });

  await newPerfume.save();
};
export const createReview = async (
  userId: string,
  rating: number,
  comment: string
) => {
  console.log("Creating review for user:", userId);
  console.log("Rating:", rating);
  console.log("Comment:", comment);
  if (!userId || rating === undefined) {
    throw new Error("Please fill all the required fields, including userId");
  }
  
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const newReview = new ReviewModel({
    userId,
    userName: user.name,
    rating,
    comment,
    createdAt: new Date(),
  });

  await newReview.save();
  return newReview;
};