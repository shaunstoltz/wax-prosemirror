import Service from '../../Service';
import TableDropDownOptions from './TableDropDownOptions';

class EditTableService extends Service {
  register() {
    this.container.bind('TableDropDownOptions').to(TableDropDownOptions);
  }
}

export default EditTableService;
