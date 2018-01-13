import React from "react"
import { Snackbar } from "react-md"

const NotificationsSnackBar = ({status, onDismiss, autohide = false}) => (
  <div>
    <Snackbar
      toasts={[{text: status}]}
      autohide={autohide}
      onDismiss={onDismiss}
    />
  </div>
)

export default NotificationsSnackBar
