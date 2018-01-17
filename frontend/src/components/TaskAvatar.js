import React from 'react'
import {
    DialogContainer,
    Avatar,
    FontIcon
 } from 'react-md';


const TaskAvatar = ({ ...props }) => {
    return (
        props.user?
           props.user.image?
            <div className="task-avatar" 
                onClick={props.onClick}
                style={{
                    backgroundImage: `url(${props.user.image})`
                }} />
            :
            <Avatar suffix="pink" onClick={props.onClick}>{props.user.first_name.slice(0,1)}</Avatar>
        :
        <Avatar 
            onClick={props.onClick}
            icon={<FontIcon>person_add</FontIcon>} />
    )
}

export default TaskAvatar