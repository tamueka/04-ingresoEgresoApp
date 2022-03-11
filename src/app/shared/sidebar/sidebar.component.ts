import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout().then(() => {
      Swal.fire({
        title: 'Cerrando sesión',
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.router.navigate(['/login']);
      Swal.close();
    });
  }
}
