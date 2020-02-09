import * as React from 'react'

interface MessageProps {
  message: object,
  updateMessage: any,
  deleteMessage: any,
  user: object
}

export const SingleMessage: React.FunctionComponent<MessageProps> = ({message, updateMessage, deleteMessage, user}) => {
  return (
    <>
      <div className="message">
        <div className="message-left">
          {message.userId}
        </div>
        <div className="message-body">
          { message.content }
        </div>
        <div className="timestamp">
          { message.timestamp }
        </div>
        <div className="delete-message">
          <button className="message-remove-btn"
          type="button"
          onClick={() => deleteMessage(message)} >
          X
          </button>
        </div>
      </div>
    </>
  )
}
