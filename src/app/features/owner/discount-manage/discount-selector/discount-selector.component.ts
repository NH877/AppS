import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IDiscount } from 'src/app/core/entities';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
    selector: 'app-discount-selector',
    templateUrl: './discount-selector.component.html',
    styleUrls: ['./discount-selector.component.scss']
})
export class DiscountSelectorComponent implements OnInit {

    public discounts: IDiscount[];
    public selectedDiscount: IDiscount;
    @Output() newItemEvent = new EventEmitter<IDiscount>();

    constructor(private dcService: DiscountService) { }

    ngOnInit(): void {
        this.getDiscountList();
    }

    private getDiscountList(): void {
        this.dcService.getAll().valueChanges().subscribe(dc => {
            this.discounts = dc as IDiscount[];
        })
    }

    public changedSelected() {
        this.newItemEvent.emit(this.selectedDiscount);
    }
}
