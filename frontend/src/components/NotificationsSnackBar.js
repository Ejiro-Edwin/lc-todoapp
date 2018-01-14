import React from "react"
import { Snackbar } from "react-md"

const NotificationsSnackBar = ({status, onDismiss, autohide = false, autohideTimeout = 1500}) => (
  <div>
    <Snackbar
      toasts={[{text: status}]}
      autohide={autohide}
      autohideTimeout={autohideTimeout}
      transitionLeaveTimeout={1000}
      onDismiss={onDismiss}
    />
  </div>
)

export default NotificationsSnackBar
