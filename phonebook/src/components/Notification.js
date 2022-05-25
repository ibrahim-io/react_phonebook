import React from "react";

const Notification = ({message, notifType}) => {
  if (message === '') {
    return null
  }

  return (
    <div className={notifType}>{message}</div>
  )
}

export default Notification