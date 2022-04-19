import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'dateFormatWithoutHour'
})
export class DateFormtPipe implements PipeTransform {

	transform(value: string): string {
        let currentDate = new Date();
        let valueDate = new Date(value);
        
        if(currentDate == valueDate)
        {
            return valueDate.getHours() +":"+this.parseSingleMinutes(valueDate.getMinutes());
        }
        else{
            return valueDate.getDate()+"/"+(valueDate.getMonth()+1)+"/"+valueDate.getFullYear()+" "+valueDate.getHours() +":"+this.parseSingleMinutes(valueDate.getMinutes());
        }

    }

    private parseSingleMinutes(minutes:number): string{
        return ((minutes.toString()).length == 1)? '0'+minutes : minutes.toString();
    }

}
