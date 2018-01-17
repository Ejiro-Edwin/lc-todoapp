import React from 'react'
import {
    DatePicker,
    DataTable,
    TableBody,
    Button,
    Grid,
    Cell
  } from 'react-md';
import TaskListItem from './TaskListItem';


const styles = {
    btn: {
        margin: "0px 0px 8px 3px"
    }
}

const TaskList = ({ ...props }) => (
    
      <Grid noSpacing>
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
        <Cell size={12}>
            <Grid>
                <Cell size={6} tabletSize={3} phoneSize={3}>
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
                </Cell>
                    <Button 
                        raised 
                        primary 
                        iconChildren="add"
                        className="md-cell--right"
                        onClick={() => props.taskDialogHandleVisibility(true)}>
                            Nova Task
                    </Button>
            </Grid>
            <DataTable plain>
              <TableBody>
                {props.tasks.length > 0?
                    props.tasks.map((task,i) =>
                        <TaskListItem 
                            key={i}
                            task={task} 
                            onTaskDescriptionChange={props.onTaskDescriptionChange}
                            onTaskDateClick={props.onTaskDateClick}
                            onToggleTaskStatus={props.onToggleTaskStatus}
                            userDialogHandleVisibility={props.userDialogHandleVisibility} />
                    )
                    : 
                    <Cell size={12}>
                        <p>Você ainda não tem tasks cadastradas nesta to-do</p>
                    </Cell>}
              </TableBody>
            </DataTable>
        </Cell>
    </Grid>
)

export default TaskList;
