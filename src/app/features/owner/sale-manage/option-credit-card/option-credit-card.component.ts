import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-option-credit-card',
    templateUrl: './option-credit-card.component.html',
    styleUrls: ['./option-credit-card.component.scss']
})
export class OptionCreditCardComponent implements OnInit {
    public selectedItem: any
    public price = 10000;
    public total = 0;
    
    public fee3: any = (this.price / 3).toFixed();
    public fee6: any = ((this.price + ((this.price * 9) / 100)) / 6).toFixed();
    public fee9: any = ((this.price + ((this.price * 30) / 100)) / 9).toFixed();
    public fee12: any = (this.price / 12).toFixed();
    public fee18: any = ((this.price + ((this.price * 10) / 100)) / 18).toFixed();

    public total3: any = (this.fee3 * 3).toFixed();
    public total6: any = (this.fee6 * 6).toFixed();
    public total9: any = (this.fee9 * 9).toFixed();
    public total12: any = (this.fee12 * 12).toFixed();
    public total18: any = (this.fee18 * 18).toFixed();

    public varCredits = [
        {
            count: 3,
            description: 0,
        },
        {
            count: 6,
            description: 9,
        },
        {
            count: 9,
            description: 30,
        },
        {
            count: 12,
            description: 0,
        },
        {
            count: 18,
            description: 10,
        },
    ]


    constructor() { }

    ngOnInit(): void {
    }

    public test(variable: number) {
        this.total = (variable * this.price / 100) + this.price
    }

}
