import { subscriptMark } from 'wax-prosemirror-schema';
import Service from '../../Service';
import Subscript from './Subscript';
import './subscript.css';

class SubscriptService extends Service {
  name = 'SubscriptService';

  register() {
    this.container.bind('Subscript').to(Subscript);
    const createMark = this.container.get('CreateMark');
    createMark(
      {
        subscript: subscriptMark,
      },
      { toWaxSchema: true },
    );
  }
}

export default SubscriptService;
