import { SET_SELECTED_DATE } from '@/store/mutation-types';
import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';

import styles from './CalendarDate.css?module';

interface Props {
  date: number,
  isActive?: boolean,
  withTasks?: boolean,
}

@Component
export default class CalendarDate extends VueComponent<Props> {
  @Prop()
  date!: number;

  @Prop()
  isActive!: boolean;

  @Prop()
  withTasks!: boolean;

  $refs!: {
    button: HTMLButtonElement
  } 

  handleClick() {
    this.$store.commit(SET_SELECTED_DATE, this.date); 
  }
  
  mounted() {
    this.handleClick && this.$refs.button.addEventListener('click', this.handleClick);
  }

  unmounted() {
    this.handleClick && this.$refs.button.removeEventListener('click', this.handleClick);
  }

  render() {
    return (
        <button ref='button'
                class={`${styles.date} ${this.withTasks && styles.withTasks} ${this.isActive && styles.active} `} 
                key={`date-${this.date}`}>
            {this.date}
        </button>
    )
  }
}
