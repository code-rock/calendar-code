import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import styles from './Task.css?module';

interface Props {
  id: number,
  text: string,
  isActive?: boolean,
  handleChange?: (e: Event, id: number) => void; 
}

@Component
export default class Task extends VueComponent<Props> {
  @Prop()
  private id !: number;
  
  @Prop()
  private text !: string;

  @Prop()
  private isActive !: boolean;

  @Prop()
  private handleChange !: (e: Event, id: number) => void; 

  $refs!: {
    checkbox: HTMLInputElement;
  } 

  mounted() {
    this.handleChange && this.$refs.checkbox.addEventListener('change', e => this.handleChange(e, this.id));
  }

  unmounted() {
    this.handleChange && this.$refs.checkbox.removeEventListener('change',  e => this.handleChange(e, this.id));
  }

  render() {
    return (
      <div class={styles.task}>
        <input ref='checkbox'
               id={this.id}
               checked={this.isActive}
               type='checkbox'
               class={styles.checkbox} />
        <label for={this.id}
               class={styles.label}>{this.text}</label>
      </div>
    )
  }
}