export default class User {
    constructor(username,
                password,
                email,
                phoneNumber,
                firstName,
                lastName,
                gender,
                address,
                birthDate,
                regDate,
                comments,
                roles) {
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
        this.regDate = regDate;

        this.comments = comments;
        this.roles = roles;
    }


}
