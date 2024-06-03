import { alear_false } from "../../../helpers/Alert.helper"

export const numberValidate = (number) => {
    try {
        return parseInt(number);
    } catch (error) {
        alear_false(`Please, Input number`, `${error}`)
    }
}