export const formValidator = (type, value) => {
    if (!value?.toString().trim()) {
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

        case "name":
            return /^[A-Za-z\s]+$/.test(value) && value.length >= 3
                ? { validation: true, message: "" }
                : { validation: false, message: "Name must be at least 3 characters and contain only alphabets" };

        case "status":
            const validStatuses = ["new", "in-progress", "closed-won", "closed-lost"];
            return validStatuses.includes(value)
                ? { validation: true, message: "" }
                : { validation: false, message: "Invalid status selected" };

        case "revenue":
            return /^[0-9]+(\.[0-9]{1,2})?$/.test(value)
                ? { validation: true, message: "" }
                : { validation: false, message: "Revenue must be a valid number" };

        case "assignedTo":
            return value ? { validation: true, message: "" } : { validation: false, message: "Assigned To is required" };

        default:
            return { validation: true, message: "" }; // No validation needed for other fields
    }
};
