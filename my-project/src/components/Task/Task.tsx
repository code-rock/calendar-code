import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import styles from './Task.css?module';

interface Props {
  text: string,
  isActive?: boolean
}

@Component
export default class Task extends VueComponent<Props> {
  @Prop()
  private text !: string;

  @Prop()
  private isActive !: boolean;

  render() {
    return (
      <div class={styles.task}>
        <input id={this.text}
               checked={this.isActive}
               type='checkbox'
               class={styles.checkbox} />
        <label for={this.text}
               class={styles.label}>{this.text}</label>
      </div>
    )
  }
}