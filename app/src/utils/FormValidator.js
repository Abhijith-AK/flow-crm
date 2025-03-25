export const formValidator = (type, value) => {
    if (!value === "taskCount" || !value === "tasks") {
        if (!value?.toString().trim()) {
            return { validation: false, message: "Field is Required" };
        }    
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
            const validStatuses = ["new", "contacted", "proposal", "won", "lost"];
            return validStatuses.includes(value)
                ? { validation: true, message: "" }
                : { validation: false, message: "Invalid status selected" };

        case "revenue":
            return /^[0-9]+(\.[0-9]{1,2})?$/.test(value)
                ? { validation: true, message: "" }
                : { validation: false, message: "Revenue must be a valid number" };

        case "assignedTo":
            return value ? { validation: true, message: "" } : { validation: false, message: "Assigned To is required" };

        case "title":
            return /^[A-Za-z0-9\s]+$/.test(value) && value.length >= 3
                ? { validation: true, message: "" }
                : { validation: false, message: "Title must be at least 3 characters and contain only letters, numbers, and spaces" };

        case "priority":
            return ["high", "medium", "low"].includes(value)
                ? { validation: true, message: "" }
                : { validation: false, message: "Invalid priority selected" };

        case "dueDate":
            return new Date(value) >= new Date()
                ? { validation: true, message: "" }
                : { validation: false, message: "Due date cannot be in the past" };
        
        case "description":
            return value.length >= 10
                ? { validation: true, message: "" }
                : { validation: false, message: "Description must be at least 10 characters long" };

        default:
            return { validation: true, message: "" }; // No validation needed for other fields
    }
};
