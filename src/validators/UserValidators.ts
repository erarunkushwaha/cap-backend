import { body, query } from "express-validator";
import User from "../models/User";

export class UserValidators {
  static registerUserViaPhone() {
    return [
      query("phone", "Phone Number is required")
        .isString()
        .custom((phone, { req }) => {
          return User.findOne({
            phone: phone,
            type: "user",
          })
            .then((user) => {
              if (user) {
                req.user = user;
                // // throw new Error('User Already Exists');
                // throw('User Already Exists');
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  static otpLogin() {
    return [
      query("phone", "Phone Number is required").isString(),
      query("otp", "OTP is required").isNumeric(),
    ];
  }

  static signup() {
    return [
      body("name", "Name is required").isString().notEmpty(),

      body("phone", "Phone number is required")
        .isString()
        .notEmpty()
        .matches(/^\d{10}$/)
        .withMessage("Phone number must be exactly 10 digits"),

      body("email", "Valid email is required")
        .isEmail()
        .custom(async (email) => {
          // ✅ Use async here
          const user = await User.findOne({ email });
          if (user) {
            throw new Error("User already exists"); // ✅ Proper error handling
          }
          return true;
        }),
      body("password", "Password is required")
        .exists()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be between 8-20 characters"),
      body("type", "User role type is required").isString().notEmpty(),

      body("status", "User status is required").isString().notEmpty(),
    ];
  }

  static verifyUserEmailToken() {
    return [
      body(
        "verification_token",
        "Email verification token is required"
      ).isNumeric(),
    ];
  }

  static login() {
    return [
      body("email", "Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .custom((email, { req }) => {
          return User.findOne({ email })
            .then((user) => {
              if (user) {
                if (
                  user.type === "user" ||
                  user.type === "admin" ||
                  user.type === "store"
                ) {
                  req.user = user; // Attach user to the request object
                  return true; // Validation passed
                } else {
                  throw new Error("You are not an authorised user");
                }
              } else {
                throw new Error("No user registered with such email");
              }
            })
            .catch((e) => {
              throw new Error(
                e.message || "Error occurred during email validation"
              );
            });
        }),

      body("password", "Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    ];
  }

  static checkResetPasswordEmail() {
    return [
      query("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                return true;
              } else {
                // throw new Error('No User Registered with such Email');
                throw "No User Registered with such Email";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  static verifyResetPasswordToken() {
    return [
      query("email", "Email is required").isEmail(),
      query("reset_password_token", "Reset password token is required")
        .isNumeric()
        .custom((reset_password_token, { req }) => {
          return User.findOne({
            email: req.query.email,
            reset_password_token: reset_password_token,
            reset_password_token_time: { $gt: Date.now() },
          })
            .then((user) => {
              if (user) {
                return true;
              } else {
                // throw new Error('Reset password token doesn\'t exist. Please regenerate a new token.');
                throw "Reset password token doesn't exist. Please regenerate a new token.";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  static resetPassword() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                req.user = user;
                return true;
              } else {
                // throw new Error('No User Registered with such Email');
                throw "No User Registered with such Email";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("new_password", "New Password is required").isAlphanumeric(),
      body("otp", "Reset password token is required")
        .isNumeric()
        .custom((reset_password_token, { req }) => {
          if (req.user.reset_password_token == reset_password_token) {
            return true;
          } else {
            req.errorStatus = 422;
            // throw new Error('Reset password token is invalid, please try again');
            throw "Reset password token is invalid, please try again";
          }
        }),
    ];
  }

  static verifyPhoneNumber() {
    return [body("phone", "Phone is required").isString()];
  }

  static verifyUserProfile() {
    return [
      body("phone", "Phone is required").isString(),
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                // throw new Error('A User with entered email already exist, please provide a unique email id');
                throw "A User with entered email already exist, please provide a unique email id";
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("password", "Password is required").isAlphanumeric(),
    ];
  }

  static verifyCustomerProfile() {
    return [
      body("name", "Name is required").isString(),
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
            type: "user",
          })
            .then((user) => {
              if (user) {
                // throw new Error('A User with entered email already exist, please provide a unique email id');
                throw "A User with entered email already exist, please provide a unique email id";
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  // static checkRefreshToken() {
  //     return [
  //         body('refreshToken', 'Refresh token is required').isString()
  //         .custom((refreshToken, {req}) => {
  //             if(refreshToken) {
  //                 return true;
  //             } else {
  //                 req.errorStatus = 403;
  //                 // throw new Error('Access is forbidden');
  //                 throw('Access is forbidden');
  //             }
  //         })
  //     ];
  // }

  static userProfilePic() {
    return [
      body("profileImages", "Profile image is required").custom(
        (profileImage, { req }) => {
          if (req.file) {
            return true;
          } else {
            // throw new Error('File not uploaded');
            throw "File not uploaded";
          }
        }
      ),
    ];
  }
}
