export default class Order {
    constructor(
        firstName,
        lastName,
        address,
        phoneNumber,
        email,
        comments,
        deliveryDate
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.comments = comments;
        this.deliveryDate = deliveryDate;
    }
}