import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConst } from 'src/app/commons/constant/app-const';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-items',
  templateUrl: './shopping-cart-items.component.html',
  styleUrls: ['./shopping-cart-items.component.css']
})
export class ShoppingCartItemsComponent implements OnInit {

  userId: any;
  subTotalCost: any = 0;
  cartItems: any[];
  serverPath = AppConst.serverPath;
  router: Router;

  constructor(private route: ActivatedRoute, private shoppingCartServices: ShoppingCartService) {
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    this.getUserCartItems();
  }

  getUserCartItems() {
    this.shoppingCartServices.getUserCartItems(this.userId).subscribe(
      (data) => {
        this.subTotalCost = data['subTotalCost'];
        this.cartItems = data['cartItems'];
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteItem(cartItemId: number) {
    this.shoppingCartServices.deleteItem(cartItemId).subscribe(
      (data) => {
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
