import React, { Component } from 'react'
import {
    Subheader,
    DatePicker,
    DataTable,
    TableBody
  } from 'react-md';
import TaskListItem from './TaskListItem';


const TaskList = ({ ...props }) => (
    
      <div className="md-grid">
        <DatePicker
            id="date-picker-controlled"
            label="Select date"
            value={props.datePickerValue}
            visible={props.datePickerVisible}
            autoOk
            locales="pt-BR"
            cancelLabel="Cancelar"
            onChange={(value) => props.onTaskDateChange(value)}
            onVisibilityChange={props.datePickerHandleVisibility}
        />
        <div className="md-cell md-cell--12">
          <p className="md-subheader md-text--secondary">Work Stuff</p>
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
