import { Component } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';

import styles from './Section.css?module';

@Component
export default class Section extends VueComponent {
  render() {
    return (
      <section class={styles.section}>
        {this.$slots.default}
      </section>
    )
  }
}
