import * as React from 'react'
import { Message } from '../store/Chat'

type MessageProps = {
  message: Message,
  deleteMessage: any,
  user: object
}

export const SingleMessage: React.FunctionComponent<MessageProps> = ({message, deleteMessage, user}) => {
  return (
    <>
      <li className="message">
        <div className="message-left">
          {user.image}
          {user.email}
        </div>
        <div className="message-body">
          { message.content }
        </div>
        <div className="time-stamp">
          { message.timestamp }
        </div>
        <div className="delete-message">
          <button className="message-remove-btn"
          type="button"
          onClick={() => deleteMessage(message)} >
          x
          </button>
        </div>
      </li>
    </>
  )
}
