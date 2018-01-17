import React, { Component } from 'react'
import {
    Subheader,
    DatePicker,
    DataTable,
    TableBody,
    Button
  } from 'react-md';
import TaskListItem from './TaskListItem';


const styles = {
    btn: {
        margin: "0px 0px 8px 3px"
    }
}

const TaskList = ({ ...props }) => (
    
      <div className="md-grid">
        <DatePicker
            id="date-picker-controlled"
            label="Select date"
            className="hidden-datepicker"
            value={props.datePickerValue}
            visible={props.datePickerVisible}
            autoOk
            locales="pt-BR"
            cancelLabel="Cancelar"
            onChange={(value) => props.onTaskDateChange(value)}
            onVisibilityChange={props.datePickerHandleVisibility}
        />
        <div className="md-cell md-cell--12">
            <div className="md-grid">
                <div class="md-cell md-cell--6">
                    <h3 className="md-text--secondary md-inline-block">{props.todoName}</h3>
                    <Button 
                        icon 
                        tooltipLabel="Editar To-Do"
                        onClick={() => props.openTodoDialog()}
                        style={styles.btn}
                        className="md-cell" >
                        {'edit'}
                    </Button>
                    <Button 
                        icon 
                        tooltipLabel="Excluir To-Do"
                        onClick={() => props.openDeleteTodoDialog()}
                        style={styles.btn}
                        className="md-cell" >
                        {'delete'}
                    </Button>
                </div>
                <div className="md-cell--right">
                    <Button 
                        raised 
                        primary 
                        iconChildren="add"
                        onClick={() => props.taskDialogHandleVisibility(true)}>
                            Nova Task
                    </Button>
                </div>
            </div>
            <DataTable plain>
              <TableBody>
                {props.tasks.map(task =>
                    <TaskListItem 
                        task={task} 
                        onTaskDescriptionChange={props.onTaskDescriptionChange}
                        onTaskDateClick={props.onTaskDateClick}
                        onToggleTaskStatus={props.onToggleTaskStatus}
                        userDialogHandleVisibility={props.userDialogHandleVisibility} />
                )}
              </TableBody>
            </DataTable>
        </div>
    </div>
)

export default TaskList;
