import { Component} from '@angular/core';
import { UserProfile } from './user-profile/user-profile';
@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  imports: [UserProfile],
})
export class App {
  protected readonly title:string = "5E INF - Angular";
}
    