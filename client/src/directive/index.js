import directive from './directives'

const importDirective = Vue => {
  /**
   * Drag and drop the instructions v-draggable="options"
   * options = {
   *  trigger: /Here the incoming as CSS selector/drag and drop the trigger/,
   *  body:    /Here to need to move the container CSS selectors/,
   *  recover: /Drag over whether to return to its original position/
   * }
   */
  Vue.directive('draggable', directive.draggable)
  /**
   * clipboard command v-draggable="options"
   * options = {
   *  value:    /In the input box to use v - the value of the model binding/,
   *  success:  /Copy the success of the callback/,
   *  error:    /Copy the callback after the failure/
   * }
   */
  Vue.directive('clipboard', directive.clipboard)
}

export default importDirective
