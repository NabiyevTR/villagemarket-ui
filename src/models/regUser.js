export default class RegUser {
    constructor(username,
                password,
                email,
                phoneNumber,
                firstName,
                lastName,
                gender,
                address,
                birthDate,
                active
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;

        this.firstName = firstName;
        this.lastName = lastName;

        this.gender = gender;
        this.address = address;
        this.birthDate = birthDate;
        this.active = active;

    }


}
