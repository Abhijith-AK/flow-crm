export const formValidator = (type, value) => {
    if (!value.trim()) {
        return { validation: false, message: "Field is Required" };
    }

    switch (type) {
        case "password":
            return value.length < 8
                ? { validation: false, message: "Password must be at least 8 characters" }
                : { validation: true, message: "" };

        case "email":
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? { validation: true, message: "" }
                : { validation: false, message: "Invalid email format" };

        case "phoneno":
            return /^\d{10}$/.test(value)
                ? { validation: true, message: "" }
                : { validation: false, message: "Invalid phone number (10 digits required)" };

        default:
            return { validation: true, message: "" }; // No validation needed for other fields
    }
};
