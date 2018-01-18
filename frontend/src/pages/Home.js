import React, { Component } from 'react';
import FullWidthSection from '../components/FullWidthSection';
import { Card, CardTitle, CardText } from 'react-md';
import TodoContainer from '../containers/TodoContainer';
import { fetchTodayTasks, fetchAllTasks } from '../actions/tasks';
import {CSVLink} from 'react-csv';
import moment from 'moment';
import { connect } from 'react-redux';

class Home extends Component {
  
  componentDidMount = () => {
    this.props.fetchTodayTasks();
    this.props.fetchAllTasks();
  }
  
  render(){
    const headers = [
      {label: 'Atribuído a', key: 'name'},
      {label: 'Concluir até', key: 'deadline'},
      {label: 'Descrição', key: 'description'},
    ]
    const data = this.props.allTasks.map(task => {
      return {
        name: task.assign_to? `${task.assign_to.first_name} ${task.assign_to.last_name}`: '',
        description: task.description,
        deadline: task.deadline? moment(task.deadline).format('DD/MM/YYYY') : ''
      }
    })
    const { tasks, todolists, allTasks } = this.props;
    return (
      <FullWidthSection>
        <Card>
          <CardTitle title="Dados" />
          <CardText>
            {tasks.length > 0? `Existem ${tasks.length} tasks cujos prazos acabam hoje` : 'Não há tasks cujos prazos acabam hoje'}
          </CardText>
          <CardText>
            {todolists.length > 0? `Existem ${todolists.length} To-dos cadastradas, escolha uma no menu ao lado para visualizar tasks` : 'Não existem To-dos cadastradas, crie uma nova no meu lateral'}
          </CardText>
          <CardText>
            {allTasks.length > 0? `Para ter um relatório de todas as Tasks cadastradas clique no botão abaixo` : 'Você ainda não tem tasks Cadastradas, crie uma nova task para ter a opção de gerar relatório'}
          </CardText>
          <CardText>
            {allTasks.length > 0?
              <CSVLink data={data}
                className="md-btn md-btn--flat md-btn--text md-pointer--hover md-text--theme-primary md-ink--primary md-inline-block"
                headers={headers} filename="relatorio_todos.csv">
                  Gerar Relatório
              </CSVLink> : null }
          </CardText>
        </Card>
        <TodoContainer {...this.props} />
      </FullWidthSection>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  tasks: state.tasks.data,
  todolists: state.todolists.data,
  allTasks: state.tasks.allTasksData
})

const mapDispatchToProps = (dispatch) => ({
  fetchTodayTasks: () => {
    dispatch(fetchTodayTasks())
  },
  fetchAllTasks: () => {
    dispatch(fetchAllTasks())
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Home);
