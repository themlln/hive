import * as React from 'react'
import { Message } from '../store/Chat'

type MessageProps = {
  message: Message
}

// export const SingleMessage: React.FunctionComponent<MessageProps> = ({message}) => {
//   return (
//     <>
//       <p>This is a new message test!</p>
//       <li className="message">
//         <div className="message-left">
//           <p>Test Message</p>
//         </div>
//         <div className="message-body">
//           { message.content }
//         </div>
//         <div className="timestamp">
//           { message.timestamp }
//         </div>
//       </li>
//     </>
//   )
// }
