import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDiscount } from 'src/app/core/entities';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
    selector: 'app-discount-selector',
    templateUrl: './discount-selector.component.html',
    styleUrls: ['./discount-selector.component.scss']
})
export class DiscountSelectorComponent implements OnInit {

    public discounts: IDiscount[];
    public discountForm: FormGroup;

    @Input() loadedDiscounts: IDiscount[];
    @Output() newItemEvent = new EventEmitter<IDiscount[]>();

    constructor(private dcService: DiscountService) { }

    ngOnInit(): void {

        this.discountForm = new FormGroup({
			'discount': new FormControl(this.loadedDiscounts, [Validators.required])
		})

        this.getDiscountList();
    }

    private getDiscountList(): void {
        this.dcService.getAll().valueChanges().subscribe(dc => {
            this.discounts = dc as IDiscount[];
        })
    }

    public changedSelected() {
        console.log(this.discountForm.get('discount')?.value)
        this.newItemEvent.emit(this.discountForm.get('discount')?.value);
    }

    compareCategoryObjects(object1: any, object2: any) {
        return object1 && object2 && object1.id == object2.id;
    }

    public reset(){
        this.discountForm.reset();
    }
}
