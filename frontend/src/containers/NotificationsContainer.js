import React, {Component} from "react"
import {connect} from "react-redux"
import NotificationsSnackBar from "../components/NotificationsSnackBar"
import {resetNotification} from "../reducers/notifications"

class NotificationsContainer extends Component {
  render() {
    const { status } = this.props

    if (status) {

      return (
        <NotificationsSnackBar
          status={status}
          onDismiss={this.props.dismissStatus}
          autohide
        />
      )
    }
    return null
  }
}


const mapStateToProps = (state) => {
    return {
      status: state.notifications.status
    }
};

function mapDispatchToProps(dispatch) {
  return {
    dismissStatus: () => dispatch(resetNotification()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer)
