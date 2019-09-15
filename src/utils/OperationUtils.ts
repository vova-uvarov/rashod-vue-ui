export default class OperationUtils {

    public static getCostSign(operation: any): string {

        if (operation.operationType === 'INCOME') {
            return '+';
        }

        if (operation.operationType === 'CONSUMPTION') {
            return '-';
        }

        return '';
    }


}
