import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-connection-failed',
  templateUrl: './connection-failed.component.html',
  styleUrls: ['./connection-failed.component.css']
})
export class ConnectionFailedComponent implements OnInit {

  constructor(private router: Router) { }

  /* bools */
  isBackClick: boolean = false;

  ngOnInit(): void {
  }

  /* go home */
  goHome(){
    this.isBackClick = true
    setTimeout(() => {
      this.router.navigateByUrl('')
    }, 1000)
  }

}
