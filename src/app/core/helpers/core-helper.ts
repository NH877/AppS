export class CoreHelper {

    public static convertToObject(obj: any): Object {
		return JSON.parse(JSON.stringify(obj));
	}
    
}
