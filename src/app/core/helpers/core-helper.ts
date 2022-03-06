export class CoreHelper {

    public static convertToObject(obj: any): Object {
		return JSON.parse(JSON.stringify(obj));
	}

	public static generateIdDate(): string {
        let date = new Date();
        let year = String(date.getFullYear());
        let month = String(date.getMonth() + 1);
        let day = String(date.getDate());
        let hour = String(date.getHours());
        let minute = String(date.getMinutes());
        let seconds = String(date.getSeconds());
        month = (month.length == 1) ? "0" + month : month;

        return year + month + day + hour + minute + seconds;
    }
    
}
