import { TypeAnimation } from 'react-type-animation'

const TypingAnimation = () => {
  return (
    <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    'Chat with your OWN AI ',
    1000,
    'Built With OpenAI',
    1000,
    'Your Own Customized ChatGPT',
    1000,
    'Becomes your new BrAIn-GPT',
    1000,
  ]}
  speed={50}
  style={{ fontSize: '60px',color:"white",display:"inline-block",textShadow: "1px 1px 20px #000" }}
  repeat={Infinity}
/>
  )
}

export default TypingAnimation
