
  import { Box, Avatar, Typography } from '@mui/material';
  import { userAuth } from '../../context/AuthContext';
  import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
  import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

  function extractCodeFromString(message: string) {
    if (message.includes("```")) {
      const blocks = message.split("```");
      return blocks;
    }
    return [message]; // Return the message as a single block if no code blocks are found
  }

  function isCodeBlock(str:String) {
    const codeIndicators = [";", "[", "]", "#", "//"];
    return codeIndicators.some(indicator => str.includes(indicator));
  }

  const ChatItem = ({ content, role }: { content: string; role: "user" | "assistant"; }) => {
    const messageBlocks = extractCodeFromString(content);
    const auth = userAuth();

    console.log('Content:', content); // Debugging log
    console.log('Message Blocks:', messageBlocks); // Debugging log

  return role === "assistant" ? (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <Box sx={{ display: 'flex', p: 1, bgcolor: '#373a40', my: 2, gap: 1, borderRadius: 10, width: 'fit-content', maxWidth: '100%', ml: 'auto', overflowWrap: 'break-word',fontSize:"15px" }}>
        <Avatar sx={{ ml: "0" }}>
          <img src='openai.png' alt='openai' width={"30px"} />
        </Avatar>
        <Box>
          <div style={{ overflow: 'auto', maxWidth: '50vw' }}>
            {!messageBlocks && (
              <Typography sx={{ fontSize: "15px" }}>{content}</Typography>
            )}
            {messageBlocks &&
              messageBlocks.length &&
              messageBlocks.map((block, index) => (
                isCodeBlock(block) ? (
                  <SyntaxHighlighter key={index} style={{ ...coldarkDark }} language='javascript'>
                    {block}
                  </SyntaxHighlighter>
                ) : (
                  <Typography key={index} sx={{ fontSize: 15, display: "flex", alignItems: "center", marginTop: 0.5 || "auto" }}>{block}</Typography>
                )
              ))
            }
  </div>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: 'flex', p: 1, bgcolor: '#a1dd70', gap: 1, borderRadius: 10, alignItems: 'center', width: 'fit-content', maxWidth: '80%' }}>
      <Avatar sx={{ ml: 0, bgcolor: 'black', color: 'white', fontSize:"20px" }}>
        {auth?.user?.name[0]}{auth?.user?.name.split('')[1][0]}
      </Avatar>
      <Box sx={{ display: 'inline-flex', alignItems: 'center', borderRadius: 10, overflowWrap: 'break-word' }}>
        <Typography fontSize="15px" fontWeight={500} color="black">
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
