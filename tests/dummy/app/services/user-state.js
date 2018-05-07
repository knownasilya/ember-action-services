import { ActionService } from 'ember-action-services';

export default ActionService.extend({
  initState() {
    return {
      test: {
        name: 'hi'
      }
    };
  },
  
  actions: {
    duplicate() {
      let { cloneUser } = this.pluckState('cloneUser');

      cloneUser = cloneUser ? cloneUser + 1 : 1;

      this.setState({ cloneUser });
    },
    
    setName() {
      this.setState({
        test: {
          name: 'good bye'
        }
      });
    }
  }
});
