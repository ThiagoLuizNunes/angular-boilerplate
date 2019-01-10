import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MsgsService {

  constructor(private toastr: ToastrService) { }

  addMsg(msgs, title, method): void {
    // Captures all message
    if (msgs instanceof Array) {
      msgs.forEach((msg) => this.toastr[method](msg, title));
    } else if (msgs instanceof Object) {
      for (let i = 0; i < Object.keys(msgs).length; i++) {
        this.toastr[method](msgs[Object.keys(msgs)[i]].message);
      }
    } else {
      this.toastr[method](msgs, title);
    }
  }
  /* Show success message method*/
  addSuccess(msgs): void {
    this.addMsg(msgs, 'Sucesso', 'success');
  }
  /* Show warning message method*/
  addWarning(msgs): void {
    this.addMsg(msgs, 'Warning', 'warning');
  }
  /* Show error message method*/
  addError(msgs): void {
    this.addMsg(msgs, 'Erro', 'error');
  }
}
