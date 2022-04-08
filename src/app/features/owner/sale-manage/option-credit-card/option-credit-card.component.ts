import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDataFee } from 'src/app/core/entities';

@Component({
    selector: 'app-option-credit-card',
    templateUrl: './option-credit-card.component.html',
    styleUrls: ['./option-credit-card.component.scss']
})
export class OptionCreditCardComponent implements OnInit {

    public fee3: number; 
    public fee6: number; 
    public fee9: number; 
    public fee12: number;
    public fee18: number; 

    public total3: number; 
    public total6: number; 
    public total9: number; 
    public total12: number; 
    public total18: number; 

    public datafee: IDataFee;

    constructor(
        public dialogRef: MatDialogRef<OptionCreditCardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: number
    ) { }

    ngOnInit(): void {
        this.feeInit();
    }

    public feeInit(): void {
        this.fee3= +(this.data / 3).toFixed(2);
        this.fee6 = +((this.data + ((this.data * 9) / 100)) / 6).toFixed(2);
        this.fee9 = +((this.data + ((this.data * 30) / 100)) / 9).toFixed(2);
        this.fee12 = +(this.data / 12).toFixed(2);
        this.fee18 = +((this.data + ((this.data * 10) / 100)) / 18).toFixed(2);

        this.total3 = +(this.fee3 * 3).toFixed();
        this.total6 = +(this.fee6 * 6).toFixed();
        this.total9 = +(this.fee9 * 9).toFixed();
        this.total12 = +(this.fee12 * 12).toFixed();
        this.total18 = +(this.fee18 * 18).toFixed();       
    }

    public selectTotal(feeNumber: string): void {
        switch(feeNumber)
        {
            case '3':
                this.datafee = {
                    feeNumber: 3,
                    total: this.total3,
                    feeValue: this.fee3,
                    rate: 0
                };
                break;
            case '6':
                this.datafee = {
                    feeNumber: 6,
                    total: this.total6,
                    feeValue: this.fee6,
                    rate: 9
                };
                break;
            case '9':
                this.datafee = {
                    feeNumber: 9,
                    total: this.total9,
                    feeValue: this.fee9,
                    rate: 30
                };
                break;
            case '12':
                this.datafee = {
                    feeNumber: 12,
                    total: this.total12,
                    feeValue: this.fee12,
                    rate: 0
                };
                break;
            case '18':
                this.datafee = {
                    feeNumber: 18,
                    total: this.total18,
                    feeValue: this.fee18,
                    rate: 10
                };           
                break;
        }       
    }
    
    public submit(): void {
        this.dialogRef.close({data:this.datafee});
    }

    public selectButton(): boolean{
       if(this.datafee == null)
       {
            return true
       }  
       return false
    }
}
