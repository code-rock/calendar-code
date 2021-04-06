import { Component, Vue } from 'vue-property-decorator';
import Section from './components/Section/Section';
import Calendar from './components/Сalendar/Сalendar';
import SectionTitle from './components/SectionTitle/SectionTitle';
import ToDoList from './components/ToDoList/ToDoList';
import './App.css';


@Component
export default class App extends Vue {
  render() {
    
    return (
      <div id="app">
        <ToDoList />
      </div>
    )
  }
}
