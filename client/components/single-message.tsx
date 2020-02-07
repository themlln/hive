import * as React from 'react'

interface MessageProps {
  message: object,
  deleteMessage: any,
  user: object
}

export const SingleMessage: React.FunctionComponent<MessageProps> = ({message, deleteMessage, user}) => {
  return (
    <>
      <li className="message">
        <div className="message-left">
          {user[0].email}
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
