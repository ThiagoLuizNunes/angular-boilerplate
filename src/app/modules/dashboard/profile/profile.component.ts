import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: any;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(
      info => {
        this.user = info.user;
      }
    );
  }

  onSubmit(form) {
    let empty: boolean;
    const emailRegex = /\S+@\S+\.\S+/;
    Object.entries(form.value).map(att => {
      if (att[1] === undefined || att[1] === '') {
        empty = true;
      }
    });
    if (empty || !form.value.password || !form.value.confirm_password) {
      this.toastr.error(`Complete todos os campos`);
      return;
    }
    if (!form.value.email.match(emailRegex)) {
      this.toastr.error(`Email inválido`);
      return;
    }
    if (form.value.password !== form.value.confirm_password) {
      this.toastr.error(`Senhas não conferem`);
      return;
    }
    form.value.id = this.user.id;
    form.value.imageUrl = this.user.imageUrl;
    delete form.value.confirm_password;
    this.authService.patchUser(form.value, (err, res) => {
      if (err) {
        this.toastr.error(err.error.message);
        return;
      }
      location.reload();
      this.toastr.success(`Usuário atualizado`);
      form.reset();
    });
  }
}
