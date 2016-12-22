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
  subscriptions = [];
  regions = [];
  plants = [];
  model = new Spc('default','default','default');

  hassubsOwnerError = false;
  hasRegionError = false;
  hasPlantError = false;

  constructor(private formPoster: FormPoster) {
    this.formPoster.getsubscriptions()
    .subscribe(
        data => {
          this.subscriptions = data.subscriptions
          this.regions = data.Regions
          this.plants = data.Plants
        },
        err => console.log('get error: ', err)
    );
    
    
  }

  submitForm(form: NgForm) {
    //validate form
    this.validatesubsOwner(this.model.subsOwner);
    if (this.hassubsOwnerError)
      return;

    this.validateRegion(this.model.Region);
    if (this.hasRegionError)
    return;

    this.validatePlant(this.model.Plant);
    if (this.hasPlantError)
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

  validatePlant(value) {
    if (value === 'default')
    this.hasPlantError = true;
    else
    this.hasPlantError=false;
  }

}
