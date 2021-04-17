import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

    constructor(private location: Location) {
    }
}
