import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  cartId!: string;
  cancelSubscriptions: Subscription = new Subscription();

  private readonly _OrderService = inject(OrderService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FormBuilder = inject(FormBuilder);

  addrees: FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });

  payment() {
    const cancelSubscription = this._OrderService
      .checkoutSession(this.cartId, this.addrees.value)
      .subscribe({
        next: (res) => {
          location.href = res.session.url;
        },
      });
    this.cancelSubscriptions.add(cancelSubscription);
  }

  ngOnInit(): void {
    const cancelSubscription = this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id')!;
        console.log(params)
      },
    });
    this.cancelSubscriptions.add(cancelSubscription);
  }
  ngOnDestroy(): void {
    this.cancelSubscriptions.unsubscribe();
  }
}
