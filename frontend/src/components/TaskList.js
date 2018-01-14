import React, { Component } from 'react'
import {
    Checkbox,
    FontIcon,
    Subheader,
    DatePicker
  } from 'react-md';
import {
    DataTable,
    TableBody,
    TableRow,
    TableColumn,
    EditDialogColumn
} from 'react-md'
import Moment from 'react-moment';
import '../../node_modules/moment/locale/pt-br';
import { calendarStrings } from '../constants/calendar';


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
          <p className="md-subheader md-text--secondary">A Fazer</p>
          <DataTable plain>
              <TableBody>
                {props.uncompletedTasks.map(task =>
                <TableRow key={task.id}>
                    <TableColumn className="checkbox-column">
                        <Checkbox 
                        id={task.id} 
                        name={`task-checkbox-${task.id}`} 
                        aria-label="Marcar como concluido"
                        />
                    </TableColumn>
                    <EditDialogColumn 
                       inlineIcon={null}
                       placeholder="Descrição" 
                       defaultValue={task.description} 
                       onKeyPress={e => {
                            e.key === "Enter"
                            ? props.onTaskDescriptionChange(task.id, e.target.value)
                            : null
                        }}
                       inline />
                    <TableColumn 
                        onClick={() => props.onTaskDateClick(task.id, task.deadline)} 
                        className="datepicker-column">
                        <FontIcon>alarm_on</FontIcon>
                        <Moment  
                           locale="pt-br"
                           calendar={calendarStrings}>{task.deadline}</Moment>
                    </TableColumn>
                    <TableColumn></TableColumn>
                </TableRow>
                )}
              </TableBody>
            </DataTable>
        </div>
        <div className="md-cell md-cell--12">
          <p className="md-subheader md-text--secondary">Feitos</p>
          <DataTable plain>
              <TableBody>
                {props.completedTasks.map(task =>
                <TableRow key={task.id}>
                    <TableColumn className="checkbox-column">
                        <Checkbox 
                            id={task.id} 
                            name={`task-checkbox-${task.id}`} 
                            aria-label="Marcar como a concluir"
                            defaultChecked />
                    </TableColumn>
                    <TableColumn>
                        <EditDialogColumn 
                            inlineIcon={null}
                            placeholder="Descrição" 
                            defaultValue={task.description} 
                            inline />
                    </TableColumn>
                    <TableColumn>
                        <div>
                            <FontIcon>alarm_on</FontIcon>
                            <Moment  
                            locale="pt-br"
                            calendar={calendarStrings}>{task.deadline}</Moment>
                        </div>
                    </TableColumn>
                    <TableColumn></TableColumn>
                </TableRow>
                )}
              </TableBody>
            </DataTable>
        </div>
    </div>
)

export default TaskList;
