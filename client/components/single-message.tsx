import * as React from 'react'
import { Message } from '../store/Chat'

type MessageProps = {
  message: Message
}

export const SingleMessage: React.FunctionComponent<MessageProps> = ({message}) => {
  return (
    <>
      <li className="message">
        <div className="message-left">

        </div>
        <div className="message-body">
          { message.content }
        </div>
        <div className="time-stamp">
          { message.timestamp }
        </div>
      </li>
    </>
  )
}
