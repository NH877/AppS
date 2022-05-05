import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDataFee } from 'src/app/core/entities';

@Component({
    selector: 'app-option-credit-card',
    templateUrl: './option-credit-card.component.html',
    styleUrls: ['./option-credit-card.component.scss']
})
export class OptionCreditCardComponent implements OnInit {

    public fee1: number;
    public fee3: number;
    public fee6: number;
    public fee9: number;
    public fee12: number;
    public fee18: number;

    public total1: number;
    public total3: number;
    public total6: number;
    public total9: number;
    public total12: number;
    public total18: number;

    public charge6: number;
    public charge9: number;
    public charge18: number;

    public checkList: boolean[] = [false, false, false, false, false, false]

    public datafee: IDataFee;

    constructor(
        public dialogRef: MatDialogRef<OptionCreditCardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { dialogRef.disableClose = true; }

    ngOnInit(): void {
        this.feeInit();
        if (this.data.dataFee) {
            switch (this.data.dataFee.feeNumber) {
                case 1:
                    this.checkList[0] = true;
                    this.selectTotal(this.data.dataFee.feeNumber);
                    break;
                case 3:
                    this.checkList[1] = true;
                    this.selectTotal(this.data.dataFee.feeNumber);
                    break;
                case 6:
                    this.checkList[2] = true;
                    this.selectTotal(this.data.dataFee.feeNumber)
                    break;
                case 9:
                    this.checkList[3] = true;
                    this.selectTotal(this.data.dataFee.feeNumber)
                    break;
                case 12:
                    this.checkList[4] = true;
                    this.selectTotal(this.data.dataFee.feeNumber)
                    break;
                case 18:
                    this.checkList[5] = true;
                    this.selectTotal(this.data.dataFee.feeNumber)
                    break;
            }
        }
    }

    public feeInit(): void {
        this.fee1 = +(this.data.creditData / 1).toFixed(2);
        this.fee3 = +(this.data.creditData / 3).toFixed(2);
        this.fee6 = +((this.data.creditData + ((this.data.creditData * 9) / 100)) / 6).toFixed(2);
        this.fee9 = +((this.data.creditData + ((this.data.creditData * 30) / 100)) / 9).toFixed(2);
        this.fee12 = +(this.data.creditData / 12).toFixed(2);
        this.fee18 = +((this.data.creditData + ((this.data.creditData * 10) / 100)) / 18).toFixed(2);

        this.total1 = +(this.fee1).toFixed();
        this.total3 = +(this.fee3 * 3).toFixed();
        this.total6 = +(this.fee6 * 6).toFixed();
        this.total9 = +(this.fee9 * 9).toFixed();
        this.total12 = +(this.fee12 * 12).toFixed();
        this.total18 = +(this.fee18 * 18).toFixed();

        this.charge6 = this.total6 - this.data.creditData
        this.charge9 = this.total9 - this.data.creditData
        this.charge18 = this.total18 - this.data.creditData
    }

    public selectTotal(feeNumber: string | number): void {
        switch (feeNumber.toString()) {
            case '1':
                this.datafee = {
                    feeNumber: 1,
                    total: this.total1,
                    feeValue: this.fee1,
                    rate: 0,
                    charge: 0,
                };
                break;
            case '3':
                this.datafee = {
                    feeNumber: 3,
                    total: this.total3,
                    feeValue: this.fee3,
                    rate: 0,
                    charge: 0,
                };
                break;
            case '6':
                this.datafee = {
                    feeNumber: 6,
                    total: this.total6,
                    feeValue: this.fee6,
                    rate: 9,
                    charge: this.charge6,
                };
                break;
            case '9':
                this.datafee = {
                    feeNumber: 9,
                    total: this.total9,
                    feeValue: this.fee9,
                    rate: 30,
                    charge: this.charge9,
                };
                break;
            case '12':
                this.datafee = {
                    feeNumber: 12,
                    total: this.total12,
                    feeValue: this.fee12,
                    rate: 0,
                    charge: 0,
                };
                break;
            case '18':
                this.datafee = {
                    feeNumber: 18,
                    total: this.total18,
                    feeValue: this.fee18,
                    rate: 10,
                    charge: this.charge18,
                };
                break;
        }
    }

    public submit(): void {
        this.dialogRef.close({ data: this.datafee });
    }

    public cancel(): void {
        this.dialogRef.close();
    }

    public selectButton(): boolean {
        if (this.datafee == null) {
            return true
        }
        return false
    }
}
