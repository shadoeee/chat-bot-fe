import axios from "axios";
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const sendChatRequest = async (message: string) => {
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
        try {
            const res = await axios.post("/chat/new", { message });

            if (res.status !== 200) {
                throw new Error("Unable to send chat");
            }

            return res.data;
        } catch (error:any) {
            if (error.response && error.response.status === 429) {
                attempt++;
                const backoffDelay = RETRY_DELAY * 2 ** attempt;
                console.error(`Rate limit hit. Retrying in ${backoffDelay} ms...`);
                await delay(backoffDelay);
            } else {
                throw error; // rethrow other errors
            }
        }
    }

    throw new Error("Max retries exceeded");
};

export const getUserChats = async () => {
    
            const res = await axios.get("/chat/all-chats");

            if (res.status !== 200) {
                throw new Error("Unable to send chat");
            }
            const data = await res.data; 
            return res.data;
   
};

export const deleteUserChats = async () => {
    
            const res = await axios.delete("/chat/delete");

            if (res.status !== 200) {
                throw new Error("Unable to delete chats");
            }
            const data = await res.data; 
            return res.data;
   
};

export const logoutUser = async () => {
    
            const res = await axios.get("/user/logout");

            if (res.status !== 200) {
                throw new Error("Unable to delete chats");
            }
            const data = await res.data; 
            return res.data;
   
};