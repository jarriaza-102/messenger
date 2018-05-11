import {Component, ElementRef, Input} from '@angular/core';
import {isNullOrUndefined} from "util";
import {SearchResult} from "../messenger-base/shared/messenger-base";
import {UserService} from "../shared/user.service";
import {APIResponseHandler} from "../../core/helpers/APIResponseHandler";
import {trigger,
  state,
  style,
  animate,
  transition} from "@angular/animations";

@Component({
  selector: 'search-users',
  templateUrl: './search.component.html',
  host: {
    '(document:click)': 'onScreenClick($event)',
  },
  animations: [
    trigger('searchState', [
      state('inactive', style({
        display: 'none',
        opacity: 0,
      })),
      state('active',   style({
        display: 'block',
        opacity: 1,
      })),
      transition('* => *', animate('.3s'))
    ])
  ]
})
export class SearchComponent {

  @Input() active: string = 'conversations';
  searchResults : SearchResult[]  = [];
  searchTerm: string = '';
  display = {
    results: false,
    other: false,
    noResults: false,
    state: 'inactive'
  };

  constructor(private elementRef: ElementRef, private userService: UserService) {}

  onScreenClick(event) {
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      this.clearResults();
    } else {
      this.onSearchTermChanged(this.searchTerm);
    }
  }

  async onSearchTermChanged(event) {
    if (isNullOrUndefined(event) || event === '') {
      this.clearResults();
      return;
    }

    this.display.state = 'active';

    const [err, response] = await APIResponseHandler.handle(this.userService.search(this.searchTerm), []);
    if (err) {
      console.log(err);
      return;
    }

    if (!response.Data) {
      if (response.ErrorMessages.length > 0) {
        console.log(response.ErrorMessages);
      }
      return;
    }

    const searchResults = response.Data as SearchResult[];
    this.display.results = true;
    this.searchResults = searchResults;
    this.display.other = searchResults.length == 5;
    this.display.noResults = searchResults.length == 0;
  }

  clearResults() {
    this.display.results = this.display.other = false;
    this.searchResults = [];
    this.display.state = 'inactive';
    this.display.noResults = false;
  }

}
