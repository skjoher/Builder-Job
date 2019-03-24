export default {
  /**
   * @description Configuration is displayed in the browser title tags
   */
  title: 'BuilderJob',
  /**
   * @description Token in the Cookie store the number of days, 1 day by default
   */
  cookieExpires: 1,
  /**
  * @description internationalization, whether or not to use the default is false
  * if you don't use, you will need to show needs in the menu in routing routing set meta: {title: 'XXX'}
  * used to display text in the menu
   */
  useI18n: true,
  /**
   * @description API request basis paths
   */
  baseUrl: {
    dev: 'http://127.0.0.1:3000/v1/',
    pro: ''
  },
  /**
   * @description The default name to open the first page of value, the default for the home
   */
  homeName: 'home',
  /**
   * @description Need to load the plug-in
   */
  plugin: {
    'error-store': {
      showInHeader: true, // Set to false logo will not be shown at the top after error log
      developmentOff: true // Set to true after won't collect error information in the development environment, convenient development error screen
    }
  }
}
