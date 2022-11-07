const validateMovie = (req, res, next) => {
    // validate req.body then call next() if everything is ok
    const { title, director, year, color, duration } = req.body;
    const errors = [];

    if (title == null) {
        errors.push({ field: 'title', message: "The field is required" });
    } else if (title.length > 255) {
        errors.push({ field: 'title', message: "The title is too long (255 car. max.)" });
    }
    if (director == null) {
        errors.push({ field: 'director', message: "The field is required" });
    }
    if (year == null) {
        errors.push({ field: 'year', message: "The field is required" });
    }
    if (color == null) {
        errors.push({ field: 'color', message: "The field is required" });
    }
    if (duration == null) {
        errors.push({ field: 'duration', message: "The field is required" });
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
};

const validateUser = (req, res, next) => {
    // validate req.body then call next() if everything is ok
    const { firstname, lastname, email, city, language } = req.body;
    const errors = [];
    const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

    if (firstname == null) {
        errors.push({ field: 'firstname', message: "The field is required" });
    } else if (firstname.length > 255) {
        errors.push({ field: 'firstname', message: "The title is too long (255 car. max.)" });
    }
    if (lastname == null) {
        errors.push({ field: 'lastname', message: "The field is required" });
    }
    if (email == null) {
        errors.push({ field: 'email', message: "The field is required" });
    } else if (!emailRegex.test(email)) {
        errors.push({ field: 'email', message: "Invalid email" });
    }
    if (city == null) {
        errors.push({ field: 'city', message: "The field is required" });
    }
    if (language == null) {
        errors.push({ field: 'language', message: "The field is required" });
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
};

module.exports = {
    validateMovie,
    validateUser
};