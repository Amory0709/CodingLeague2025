import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home1',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './home1.component.html',
  styleUrl: './home1.component.scss'
})
export class Home1Component {
  isLoggedIn = false;
  userInfo = null;
}
