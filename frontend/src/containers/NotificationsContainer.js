import React, {Component} from "react"
import {connect} from "react-redux"
import NotificationsSnackBar from "../components/NotificationsSnackBar"
import {resetNotification} from "../reducers/notifications"

class NotificationsContainer extends Component {
  render() {
    const { error } = this.props

    let status = {text: "", type: "success"}
    if (error) {
        status.text = extractMsg(error)

      return (
        <NotificationsSnackBar
          status={status.text}
          onDismiss={this.props.dismissStatus}
          autohide
        />
      )
    }
    return null
  }
}

function extractMsg(error) {
  if (error instanceof Error) return error.message
  if (typeof error === "string") return error

  const {global = "", items = []} = error

  if (global) return global

  if (items.length) {
    // Just return the first one
    // TODO? or should concat all and display them?
    const [{valor} = {}] = items
    return valor
  }
  return "Houve um erro durante a requisição"
}

const mapStateToProps = (state) => ({
    error: state.notifications.status
});

function mapDispatchToProps(dispatch) {
  return {
    dismissStatus: () => dispatch(resetNotification()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer)
