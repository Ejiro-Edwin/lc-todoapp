import React from 'react'
import {
    Checkbox,
    FontIcon,
    TableRow,
    TableColumn,
    EditDialogColumn
}  from 'react-md';
import Moment from 'react-moment';
import TaskAvatar from './TaskAvatar';
import { calendarStrings } from '../constants/calendar';
import '../../node_modules/moment/locale/pt-br';

const TaskListItem = ({task, ...props}) => {
    const completed = task.status === "completed";
    return (
        <TableRow key={task.id} className={completed? 'task-completed' : ''}>
            <TableColumn className="checkbox-column">
                <Checkbox 
                    id={task.id} 
                    name={`task-checkbox-${task.id}`} 
                    aria-label="task-checkbox"
                    defaultChecked={completed}
                    checkedCheckboxIcon={<FontIcon>check</FontIcon>}
                    onChange={(e) => props.onToggleTaskStatus(task.id, e)}
                />
            </TableColumn>
            {completed?
                <TableColumn className="task-description-column">{task.description}</TableColumn>
                :
                <EditDialogColumn 
                    className="task-description-column "
                    rows={1}
                    inlineIcon={null}
                    maxRows={3}
                    placeholder="Descrição" 
                    defaultValue={task.description} 
                    onKeyDown={ e => 
                        e.target.value = e.target.value.slice(0,180)
                    }
                    onKeyPress={e => {
                        e.key === "Enter"? 
                        props.onTaskDescriptionChange(task.id, e)
                        : null
                    }}
                    inline />
            }
            <TableColumn 
                onClick={() => 
                    {!completed?
                        props.onTaskDateClick(task.id, task.deadline)
                    : null }
                } 
                className="datepicker-column">
                <FontIcon>alarm</FontIcon>
                {task.deadline?
                    <Moment  
                        calendar={calendarStrings}>{task.deadline}
                    </Moment>: null}
            </TableColumn>
            <TableColumn className="avatar-column">
                <TaskAvatar 
                    onClick={() => {!completed? props.userDialogHandleVisibility(true, task.id) : null}}
                    user={task.assign_to} role="presentation" />
            </TableColumn>
        </TableRow>
    )
}

export default TaskListItem;