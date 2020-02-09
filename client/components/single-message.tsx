import * as React from 'react'

interface MessageProps {
  message: object,
  deleteMessage: any,
}

export const SingleMessage: React.FunctionComponent<MessageProps> = ({message, deleteMessage, user}) => {
  console.log()
  return (
    <>
      <div className="message">
        <div className="message-left">
          {message.userId}
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
      </div>
    </>
  )
}
