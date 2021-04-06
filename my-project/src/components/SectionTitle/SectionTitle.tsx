import { Component } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import styles from './SectionTitle.css?module';

@Component
export default class SectionTitle extends VueComponent {
  render() {
    return (
      <h4 class={styles.title}>
        {this.$slots.default}
      </h4>
    )
  }
}