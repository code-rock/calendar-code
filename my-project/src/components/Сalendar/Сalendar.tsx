import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import CalendarDate from '../CalendarDate/CalendarDate';
import styles from './Сalendar.css?module';
import createArr from '../../utils/createArrNaturalNum';

interface Props {
  days: Array<string>,
  daysInMonth: number,
  startFrom: number,
  selectedDay?: number,
  specialDates?: Array<number>
}

@Component
export default class Calendar extends VueComponent<Props> {
  @Prop()
  days!: Array<string>;

  @Prop()
  daysInMonth!: number;
  
  @Prop()
  startFrom!: number;

  @Prop()
  selectedDay!: number;

  @Prop()
  specialDates!: Array<number>;

  renderDaysOfWeek() {
    return this.days.map(day => <div class={styles.day}>{day}</div>)
  }

  renderSpaceToBeginningMonth() {
    return createArr(this.startFrom).map((n) => <div key={`empty-${n}`}></div>);
  }

  renderDates() {
    return createArr(this.daysInMonth).map((el) => 
              <CalendarDate date={el} 
                            isActive={this.selectedDay === el}
                            withTasks={this.specialDates.includes(el)} />)
  }

  render() {
    return (
      <div class={styles.calendar}>
        {this.renderDaysOfWeek()}
        {this.renderSpaceToBeginningMonth()}
        {this.renderDates()} 
      </div>
    )
  }
}
