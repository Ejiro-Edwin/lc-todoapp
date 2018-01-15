import React, { Component } from 'react'
import {
    Subheader,
    DatePicker,
    DataTable,
    TableBody,
    Button
  } from 'react-md';
import TaskListItem from './TaskListItem';


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
                <h5 className="md-text--secondary md-cell md-cell--6">{props.todoName}</h5>
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
                        onToggleTaskStatus={props.onToggleTaskStatus} />
                )}
              </TableBody>
            </DataTable>
        </div>
    </div>
)

export default TaskList;
