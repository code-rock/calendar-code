import { Component } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import Section from '../Section/Section';
import Calendar from '../Сalendar/Сalendar';
import SectionTitle from '../SectionTitle/SectionTitle';
import Task from '../Task/Task';
import TextField from '../TextField/TextField';
import styles from './ToDoList.css?module';
import { SET_TASK, SET_NEW_TASK_TEXT } from '../../store/mutation-types';
import { days, months } from './constants';

@Component
export default class ToDoList extends VueComponent {
    $refs!: {
        form: HTMLFormElement
    } 

    mounted() {
        this.handleSubmit && this.$refs.form.addEventListener('submit', this.handleSubmit);
    }
    
    unmounted() {
        this.handleSubmit && this.$refs.form.removeEventListener('submit', this.handleSubmit);
    }

    handleSubmit = (e: Event) => {
        e.preventDefault();
        this.$store.commit(SET_TASK);
    }

    handleChangeTask({ target }: Event) {
        const targetInputElement: HTMLInputElement = target as HTMLInputElement;
        this.$store.commit(SET_NEW_TASK_TEXT, targetInputElement.value); 
    }

   render() {
    return  <div class={styles.todo}>
                <Section>
                    <SectionTitle>
                        {months[this.$store.state.month - 1]} {this.$store.state.year}
                    </SectionTitle>
                    <Calendar daysInMonth={this.$store.getters.countDaysInMonth} 
                              days={days} 
                              startFrom={this.$store.getters.countMonthFromStart}
                              selectedDay={this.$store.getters.getSelectedDay}
                              specialDates={this.$store.getters.getDatesWithTasks}/>
                </Section>
                <Section>
                    <SectionTitle>События</SectionTitle>
                    <div class={styles.taskList}>
                        {this.$store.getters.getCurrTasks.map((task: string) => {
                            return <Task text={task} />
                        })}
                        <form ref='form'>
                            <TextField handleInput={this.handleChangeTask} 
                                   value={this.$store.state.newTaskText}
                                   placeholder='Текст' />
                        </form>
                    </div>
                </Section>
            </div>
  }
}

