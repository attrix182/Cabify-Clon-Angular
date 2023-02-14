import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss'],
  imports: [IonicModule],
  standalone: true
})
export class RoutesListComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
