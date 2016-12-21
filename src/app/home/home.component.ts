import {Component} from '@angular/core';
import {Spc}  from '../models/spc.model';
import { FormPoster } from '../services/form-poster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  subscriptions = ["VICH","ABV","LRR","TIH"];
  regions = ["China","India","Brazil","Europe"];
  plants = ["CN-QHD","IN-DAB","BR-BRS","DK-ASV"];
  model = new Spc('default','default');

  hassubsOwnerError = false;
  hasRegionError = false;

  constructor(private formPoster: FormPoster) {

  }

  submitForm(form: NgForm) {
    //validate form
    this.validatesubsOwner(this.model.subsOwner);
    if (this.hassubsOwnerError)
      return;

    this.validateRegion(this.model.Region);
    if (this.hasRegionError)
    return;

    this.formPoster.postSpcForm(this.model)
      .subscribe(
          data => console.log('success: ', data),
          err => console.log('error: ', err)
      )
  }


  validatesubsOwner(value) {
    if (value === 'default')
    this.hassubsOwnerError = true;
    else
    this.hassubsOwnerError=false;
  }

    validateRegion(value) {
    if (value === 'default')
    this.hasRegionError = true;
    else
    this.hasRegionError=false;
  }
}
