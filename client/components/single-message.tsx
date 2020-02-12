import * as React from 'react'
import DeleteButton from './buttons/deleteButton'

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

          <a href="#">
            <img
              className="message-img"
              src='/bee-profile.png'
              height={40}
              alt="image" />
          </a>

        </div>


        <div className = "message-right">
          <div className = "message-right-top">
            <div className = "left-side-top">
              <span className = "messageUsername">{ message.username }</span>
              <span className="timestamp">{ message.timestamp }</span>
            </div>
            <span><button className="message-remove-btn"
                type = "button"
                onClick={() => deleteMessage(message, channelId)} >x
              </button>
            </span>
          </div>

          <div className = "message-right-bottom">
            <span className = "message-right-bottom-left">
              <span className="message-body">{ message.content }</span>
            </span>

            </div>
        </div>
      </div>
    </>
  )
}
