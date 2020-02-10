import * as React from 'react'

interface MessageProps {
  message: object,
  deleteMessage: any,
  user: object,
  channelId: string
}

export const SingleMessage: React.FunctionComponent<MessageProps> = ({message, deleteMessage, user, channelId}) => {
  return (
    <>
      <div className="message">
        <div className="message-left">
        { message.username }
          <a href="#">
            <img className="message-img" src='/melon-icon.png' alt="image" />
          </a>
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
          onClick={() => deleteMessage(message, channelId)} >
          X
          </button>
        </div>
      </div>
    </>
  )
}
