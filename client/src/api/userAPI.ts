import axios from 'axios'
import type { Users, UserProfile } from "../types/Users"

const USER_API = `${import.meta.env.VITE_BASE_URL_API}/users`

export async function loginUser(userData: Pick<Users, "email" | "password">) {
  try {
    const res = await axios.post(`${USER_API}/login`, userData)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login Failed')
    }
    throw new Error('An unexpected error occurred.')
  }
}

export async function registerUser(userData: Users) {
  try {
    const res = await axios.post(`${USER_API}/register`, userData);
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Register Failed')
    }
    throw new Error('An unexpected error occurred.')
  }
}

export async function fetchUserProfile(userId: number): Promise<UserProfile> {
  try {
    const res = await axios.get(`${USER_API}/${userId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch user profile');
    }
    throw new Error('An unexpected error occurred.');
  }
}


const userAPI = {
  loginUser,
  registerUser,
  fetchUserProfile,
}

export default userAPI