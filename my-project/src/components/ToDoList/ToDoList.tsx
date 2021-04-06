import { Component } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import Section from '../Section/Section';
import Calendar from '../Сalendar/Сalendar';
import SectionTitle from '../SectionTitle/SectionTitle';
import Task from '../Task/Task';
import TextField from '../TextField/TextField';
import styles from './ToDoList.css?module';
import { SET_TASK, SET_NEW_TASK_TEXT, CHANGE_TASK_EXECUTION_STATUS } from '../../store/mutation-types';
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
    
    handleChangeStatus = ({ target }: Event, id: number) => {
        const targetInputElement: HTMLInputElement = target as HTMLInputElement;
        this.$store.commit(CHANGE_TASK_EXECUTION_STATUS, {
            id: id,
            isDone: targetInputElement.checked
        });
    }

    handleChangeTask({ target }: Event) {
        const targetInputElement: HTMLInputElement = target as HTMLInputElement;
        this.$store.commit(SET_NEW_TASK_TEXT, targetInputElement.value); 
    }

   render() {
    const { countDaysInMonth, countMonthFromStart, getSelectedDay, getDatesWithTasks, getCurrTasks } = this.$store.getters;
    const { month, year, newTaskText } = this.$store.state;
    return  <div class={styles.todo}>
                <Section>
                    <SectionTitle>
                        {months[month - 1]} {year}
                    </SectionTitle>
                    <Calendar daysInMonth={countDaysInMonth}                               
                              startFrom={countMonthFromStart}
                              selectedDay={getSelectedDay}
                              specialDates={getDatesWithTasks}
                              days={days} />
                </Section>
                <Section>
                    <SectionTitle>События</SectionTitle>
                    <div class={styles.taskList}>
                        {getCurrTasks.map((item: { task: string, isDone: boolean}, id: number) => {
                           console.log(item,'vdsv', typeof id)
                           return <Task id={id}
                                        key={`${id}`} 
                                        text={item.task} 
                                        isActive={item.isDone}
                                        handleChange={this.handleChangeStatus} />
                        })}
                        <form ref='form'>
                            <TextField handleInput={this.handleChangeTask} 
                                       value={newTaskText}
                                       placeholder='Текст' />
                        </form>
                    </div>
                </Section>
            </div>
  }
}

