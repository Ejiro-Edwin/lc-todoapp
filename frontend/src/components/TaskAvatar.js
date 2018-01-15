import React from 'react'
import {
    DialogContainer,
    Avatar
 } from 'react-md';


const TaskAvatar = ({ ...props }) => {
    return (
        props.user?
           props.user.image?
            <div className="task-avatar" 
                onClick={props.onClick || null}
                style={{
                    backgroundImage: `url(${props.image})`
                }} />
            :
            <Avatar>{props.user.first_name.slice('0')}</Avatar>
        :
        <div />
    )
}

export default TaskAvatar