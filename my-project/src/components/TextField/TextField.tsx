import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';

import styles from './TextField.css?module';

interface Props {
    value: string,
    placeholder?: string,
    handleKeyUp?: (e: KeyboardEvent) => void,
    handleInput?: (e: Event) => void
}

@Component
export default class TextField extends VueComponent<Props> {
  @Prop()
  private value !: string;

  @Prop()
  private placeholder !: string;

  @Prop()
  private handleKeyUp !: (e: KeyboardEvent) => void;
  
  @Prop()
  private handleInput !: (e: Event) => void; 

  $refs!: {
    input: HTMLInputElement
  } 

  mounted() {
    this.handleKeyUp && this.$refs.input.addEventListener('keyup', this.handleKeyUp);
    this.handleInput && this.$refs.input.addEventListener('input', this.handleInput);
  }

  unmounted() {
    this.handleKeyUp && this.$refs.input.removeEventListener('keyup', this.handleKeyUp);
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