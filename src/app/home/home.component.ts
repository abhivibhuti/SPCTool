import {Component} from '@angular/core';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  subscriptions = ["VICH","ABV","LRR","TIH"]
  regions = ["China","India","Brazil","Europe"]
  plants = ["CN-QHD","IN-DAB","BR-BRS","DK-ASV"]
}
