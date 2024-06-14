import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { userAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';

type Message = {
    role: string;
    content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = userAuth();
  const [ChatMessages, SetChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    SetChatMessages((prev) => [...prev, newMessage]);

    try {
      const chatdata = await sendChatRequest(content);
      SetChatMessages(chatdata.chats);
    } catch (error) {
      console.error("Error sending chat request:", error);
      // Optionally display an error message to the user
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting chats", {id: "deletechats"})
      await deleteUserChats();
      SetChatMessages([]);
      toast.success("Successfully Chats Deleted", {id: "deletechats"})
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete chats", {id: "deletechats"})
    }
  }
  
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats().then((data) => {
        SetChatMessages([...data.chats]);
        toast.success("Successfully loaded chats", { id: "loadchats" })
      }).catch(err => {
        console.log(err);
      toast.error("Loading Failed", { id: "loadchats" })
    });
    }
  },[auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  },[auth])

  return (
    <Box sx={{ display: "flex", flex: 1, width: "100%", height: "85vh", mt: 3, gap: 3 }}>
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
        <Box sx={{ display: "flex", height: "fit-content",width:"20vw", bgcolor: "rgb(17,29,39)", borderRadius: 5, flexDirection: "column", mx: 3 ,mt:-3,p:2}}>
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700, height: 70, width:70, fontSize:35 }}>
            {auth?.user?.name[0]}{auth?.user?.name[1]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "Outfit", fontSize: 15, textAlign: "center",mt:-2 }}>
  <h2>Welcome to BRAIN-GPT</h2>
  <p>You are chatting with BRAIN, your AI-powered assistant!</p>
</Typography>
<Typography sx={{ mx: "auto", fontFamily: "Outfit", my: 4, p: 0, fontSize: 15, textAlign: "center",mt:0 }}>
  Feel free to ask me anything about:
   <Box component="ul" sx={{ textAlign: "left", listStyleType: 'disc', pl: 4 }}>
      <li>Knowledge and General Information</li>
      <li>Business Insights</li>
      <li>Educational Topics</li>
      <li>Coding Tips and Tricks</li>
    </Box>
  <p><strong>Quick Tips:</strong></p>
  <p>Use clear and concise questions for the best answers. Experiment with different topics and discover my capabilities.</p>
  <p><strong>Reminder:</strong> Please avoid sharing any personal or sensitive information during our chat.</p>
</Typography>
<Typography sx={{ mx: "auto", fontFamily: "Outfit", fontSize: 17, textAlign: "center", mt: -4, color:"lightgreen" }}>
  <strong>Let's Explore Together!</strong>
</Typography>

          <Button onClick={handleDeleteChats} sx={{ width: "200px", my: "auto", color: "white", fontWeight: "700", borderRadius: 3, mx: "auto", bgcolor: red[300], ":hover": { bgcolor: red.A400 } ,mt:2}}>
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: 'column', px: 3,width:"60%",height:"100%",marginLeft:"-2vw" }}>
        <Typography    sx={{
        textAlign: "center",
        fontSize: {
          xs: "24px", // small screens
          sm: "26px", // medium screens
          md: "32px", // large screens
          lg: "36px", // extra large screens
          xl: "40px"  // extra extra large screens
        },
        color: "white",
        mb: 2,
        mx: "auto",
        fontWeight: 600,
        mt: {
          xs: "-40px", // small screens
          sm: "-75px", // medium screens
          md: "-80px", // large screens
          lg: "-80px", // extra large screens
          xl: "-80px"  // extra extra large screens
        },
        ml: {
          xs: "8vw",  // small screens
          sm: "22vw", // medium screens
          md: "16vw", // large screens
          lg: "18vw", // extra large screens
          xl: "18vw"  // extra extra large screens
        }
      }}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box sx={{
            width: "100%",
            height: "80vh",
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: "column",
            overflow: "hidden",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            '&::-webkit-scrollbar': {
                display: 'none'
          },
            marginTop: -2,
            '-ms-overflow-style': 'none',  // IE and Edge
            'scrollbar-width': 'none'  // Firefox
        }}>
          {ChatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <Box sx={{ width: "98%", p: 1, borderRadius: 8, backgroundColor: "#344c64", display: "flex", alignItems: "center",mt:2 }}>
          <input
            type='text'
            ref={inputRef}
            style={{ width: "100%", backgroundColor: 'transparent', padding: "10px", border: "none", outline: "none", color: "white", fontSize: "17px" }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <IconButton sx={{ ml: 'auto', color: "white" }} onClick={handleSubmit}>
            <IoMdSend />
          </IconButton>
        </Box>
        <Footer sx={{mt:0}} />
      </Box>
    </Box>
  );
};

export default Chat;
