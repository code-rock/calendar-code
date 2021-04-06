import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';

import styles from './TextField.css?module';

interface Props {
    value: string,
    placeholder?: string,
    handleInput?: (e: Event) => void
}

@Component
export default class TextField extends VueComponent<Props> {
  @Prop()
  private value !: string;

  @Prop()
  private placeholder !: string;

  @Prop()
  private handleInput !: (e: Event) => void; 

  $refs!: {
    input: HTMLInputElement
  } 

  mounted() {
    this.handleInput && this.$refs.input.addEventListener('input', this.handleInput);
  }

  unmounted() {
    this.handleInput && this.$refs.input.removeEventListener('input', this.handleInput);
  }

  render() {
    return (
        <input ref="input" 
               type='text' 
               class={styles.text} 
               value={this.value}
               placeholder={this.placeholder} />
    )
  }
}