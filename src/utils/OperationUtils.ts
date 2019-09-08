export default class OperationUtils {

    public static getCostSign(operation: object): string {

        if (operation.operationType === 'INCOME') {
            return '+';
        }

        if (operation.operationType === 'CONSUMPTION') {
            return '-';
        }

        return '';
    }


}
