import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
}




export const signup = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).json({ error: "Email is already in use" });
        }
        const user = await User.create({ email, password });
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",

        });
        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            },
        });



    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Something went wrong" });
    }
    

};

export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(400).json({ error: "Invalid credentials" });
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return response.status(400).json({ error: "password is incorrect" });
        }
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",

        });
        return response.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                Image: user.image,
                color: user.color,
            },
        });



    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Something went wrong" });
    }
};

export const getUserInfo=async (request, response, next) => {
    try {

        const userData = await User.findById(request.userId);
        if (!userData){
            return response.status(400).send({message:"user with the given id not found" });

        }


       
        
        return response.status(200).json({
            user: {
                id: userData.id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                firstName: userData.firstName,
                lastName: userData.lastName,
                Image: userData.image,
                color: userData.color,
            },
        });



    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Something went wrong" });
    }
};




