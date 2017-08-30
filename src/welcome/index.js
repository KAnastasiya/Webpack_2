import './icon/twitter.svg';
import template from './welcome.pug';
import './welcome.scss';

export default class Welcome {
  constructor(options) {
    this.elem = document.createElement('section');
    this.elem.className = 'welcome';
    this.elem.innerHTML = template(options);
  }
}
