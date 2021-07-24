export default class Order {
    constructor(
        id,
        firstName,
        lastName,
        address,
        phoneNumber,
        email,
        cart,
        comments
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.cart = cart;
        this.comments = comments;
    }
}