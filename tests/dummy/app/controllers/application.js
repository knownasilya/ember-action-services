import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  userState: service('user-state'),
  appName: 'Ember Twiddle',
  
  actions: {
    duplicate() {
      let cloneUser = this.get('userState.state.cloneUser') || 1;
      try {
        this.set('userState.state.cloneUser', cloneUser + 1);
      } catch(e) {
        alert(e);
      }
    },
    
    setName() {
      try {
        this.set('userState.state.test.name', 'bye');
      } catch(e) {
        alert(e);
      }
    }
  }
});
