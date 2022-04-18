import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { equal } from 'assert';
import { IProduct } from 'src/app/core/entities';
import { CoreHelper } from 'src/app/core/helpers/core-helper';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
    selector: 'app-product-multi-selector',
    templateUrl: './product-multi-selector.component.html',
    styleUrls: ['./product-multi-selector.component.scss']
})
export class ProductMultiSelectorComponent implements OnInit {

    public productList: IProduct[];
    public selectedProducts: IProduct[];
    public isLoading: boolean;

    @Input() products: IProduct[];
    @Output() newItemEvent = new EventEmitter<IProduct[]>();

    constructor(private productService: ProductService) { }

    async ngOnInit(): Promise<void> {
        this.isLoading = true;
        this.getProducts();
    }

    private getProducts(): void {
        this.productService.getAll_sync().then(responce => {
            this.productList = responce as IProduct[];
            this.selectedProducts = this.products
        })
            .finally(() => {
                this.isLoading = false;
            })
    }

    compareFn(op1: IProduct, op2: IProduct) {
        return op1.name === op2.name;
    }

    public changedSelected() {
        this.newItemEvent.emit(this.selectedProducts);
    }
}
