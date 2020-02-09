import * as React from 'react'

interface MessageProps {
  message: object,
  updateMessage: any,
  deleteMessage: any,
}

export const SingleMessage: React.FunctionComponent<MessageProps> = ({message, updateMessage, deleteMessage, user}) => {
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
        <div className="timestamp">
          { message.timestamp }
        </div>
        <div className="edit-message">
          <button className="message-edit-btn"
          type="button"
          onClick={() => updateMessage(message)} >
          Edit
          </button>
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
