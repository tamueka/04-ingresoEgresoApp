import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// Modulos
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FooterComponent, NavbarComponent, SidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
})
export class SharedModule {}
