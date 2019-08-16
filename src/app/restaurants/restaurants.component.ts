import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from '../shared/services/restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState: string = 'hidden'
  restaurants: Array<Restaurant>

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantsService: RestaurantsService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.formBuilder.control('')
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm => 
        this.restaurantsService
          .listRestaurants(searchTerm)
          .catch(() => Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsService.listRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }
}
