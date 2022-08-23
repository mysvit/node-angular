export class DateDb {

    value: Date

    constructor() {
        const dateJS = new Date()
        this.value = new Date(dateJS.getFullYear(), dateJS.getMonth(), dateJS.getDate(), dateJS.getHours(), dateJS.getMinutes(), dateJS.getSeconds())
    }

}
