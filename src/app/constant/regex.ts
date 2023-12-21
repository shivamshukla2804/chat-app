export const REGEX = {
  // NUMBER: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
  NUMBER: /^\d{10}/,
  ONLY_NUMBER: /^\d+$/,
  ONLY_ALPHABET: /^[a-zA-Z]*$/,
  NAME: /^[a-z\ -]+$/i,
  // FULLNAME:/^(([a-z]+\s)?[a-z]+)*?$/i,
  FULLNAME:/^([a-zA-Z]+\s)*[a-zA-Z]+$/,
 // FULLNAME:/^[^\s].+[^\s]$/,
  // START_WITH_ALPHABET_ENDS_WITH_DIGITS: /^[a-zA-Z]{4}[0-9]{4}$/,
  // ALPHABET_WITH_DIGITS: /^[a-zA-Z0-9]+$/,
  AMOUNT: /^\d+$/,
  EMAIL: /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,5}$/i,
  // PASSWORD: /(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=.*[@#$%^&+=])(?=[^0-9]*[0-9]).{6,20}/,
  PASSWORD:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,

  //PASSWORD:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{6,20}$/,

  BUSINESS_NAME:/^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,100}$/,
  // FIRST_NAME:/^[A-Z][a-z]{3,25}$/,
  FIRST_NAME:/^[a-zA-Z ]{3,25}$/,
  LAST_NAME:/^[a-zA-Z ]{3,25}$/,
  // PHONE_NUMBER:/^d{9}$/,
  PHONE_NUMBER:/^\d+$/
  //URL: /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/
};

export const ACCOUNT_ERROR_MESSAGES = {
  NAME_REQ: 'Please enter name',
  FIRST_NAME_REQ: 'Please enter first name',
  LAST_NAME_REQ: 'Please enter last name',
  MIN_NAME_REQ: 'Please enter atleast 3 characters',
  MOBILE_REQ: 'Please enter phone number',
  INVALID_MOBILE: 'Please enter a valid phone number',
  PHONE_NUMBER: 'Please enter only numbers and 10 digits',
  PASSWORD_REQ: 'Please enter password',
  // INVALID_PASSWORD:
  //   'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, minimum 8 and maximum 16 characters',
  INVALID_PASSWORD:'Invalid credentials',
  NO_SPACE_PASSWORD: "Password can't start or end with a blank space",
  EMAIL_REQ: 'Please enter email address',
  INVALID__EMAIL: 'Please enter a valid email address',
  INVALID_EMAIL: 'Invalid credentials',
  ONLY_ALPHABET: 'Only alphabets are allowed',
  INVALID_EMAIL_PASS: 'Invalid credentials',
  INVALID_NAME:'Invalid Name cannot start with a blank space and no special characters or number.',
  INVALID_CONTACT: 'Invalid Contact Number.',
  INVALID_COMPANY: 'Invalid Company Name',
  INVALID_BUSINESS_NAME: 'INVALID BUSINESS NAME.',
  PROFILE_PIC:'Profile picture is required.',
  FIRST_NAME:'Incorrect first name',
  LAST_NAME:'Incorrect last name',
  FULL_NAME:'Invalid full name',
  ADDUSER_EMAIL:'Invalid Email address'

};


export const ACCOUNT_SUCCES_MESSAGES = {
  RESET_PASSWORD_SUCCESS:
    "Your password has been changed. Sign in again.",
    REATTEMPT_LINK:"You have exhausted the limit. Try again later",
};

export const PASSWORD_ERROR_MESSAGES = {
  OLD_PASSWORD_REQ: 'Please enter old password',
  INVALID_OLD_PASSWORD:
    'Old password must contain at least 1 uppercase, 1 lowercase, 1 number, minimum 6 and maximum 20 characters',
  NO_SPACE_OLD_PASSWORD: "Old password can't start or end with a blank space",
  NEW_PASSWORD_REQ: 'Please enter new password',
  // INVALID_NEW_PASSWORD:
  //   'New password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, minimum 8 and maximum 16 characters',
  INVALID_NEW_PASSWORD:'Password must be 6-20 characters and contain 1 upper letter, 1 lower letter & 1 number',
  NO_SPACE_NEW_PASSWORD: "New password can't start or end with a blank space",
  C_PASSWORD_REQ: 'Please enter confirm new password',

  //   'Confirm new password must contain at least , 1 lowercase, 1 number, 1 special character, minimum 32 and maximum 16 characters',
  INVALID_C_PASSWORD:"Both Password don't match",
  NO_SPACE_C_PASSWORD:
    "Confirm new password can't start or end with a blank space",
  CONFORM_PASSWORD_MATCH_ERR:
    "Both Password don't match",
  OLD_NEW_PASSWORD_MATCH_ERR: "Old & New password can't be the same",
  WRONG_OLD_PASSWORD: 'Entered old password was incorrect',
};
