import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_core/services/account.service';
import { TokenService } from 'src/app/_core/services/token.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {

    console.log(this.tokenService.isAdmin())
  }


  get isAdmin(){
    return this.tokenService.isAdmin();
  }

}
