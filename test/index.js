import 'normalize.css';
import './artists.json';
import './common/scaffolding.scss';
import Welcome from './welcome/index';

const welcome = new Welcome();
document.body.appendChild(welcome.elem);

if (NODE_ENV === 'dev') {
  const hello = () => 'hello';
  const world = () => 'world';
  const s = `${hello()}, ${world()}`;
  console.log(s);

  console.log($);
}
