import { QueryOptions } from "@apollo/client";

// Apollo messages
export const INVALID_OR_EXPIRED_TOKEN_MESSAGE = 'Sorry! Your token is expired or invalid';
export const NOT_FOUND_EXCEPTION = 'Not Found Exception';
export const CONFLICT_EXCEPTION = 'conflict exception';
export const SOMETHING_WENT_WRONG = 'Something went wrong';
export const REQUEST_NOT_FOUND = 'Requests not found for current user';
export const TOKEN_NOT_FOUND = 'Token not found';
export const AUTH_TOKEN = 'helmer_admin_token';
export const USER_EMAIL = 'helmer_user_email';
export const PRECONDITION_FAILED_EXCEPTION = 'Precondition Failed Exception';
export const UNAUTHORIZED = 'Unauthorized';
export const TOKEN_INVALID = 'Token Invalid';
export const FORGET_PASSWORD = 'Forgot password?'
export const LOGIN = 'Login'
export const SIGN_UP = 'Sign Up'
export const LOG_IN = 'Log In'
export const INVALID_EMAIL = "Invalid email address";
export const GET_STARTED = 'Get started for free'
export const SAVE = 'Save'
export const USER_ALREADY_EXIST = 'User already exists';
export const CREATE_USER_SUCCESS = "User created successfully"
export const RESET_PASSWORD = 'Reset Password'
export const FORGET_PASSWORD_INSTRUCTION = 'Please enter your associated email to reset password.'
export const SEND_INSTRUCTION = 'Send instructions'
export const BACK_TO_LOGIN = 'Back to login page'
export const SET_PASSWORD = 'Set your Password'
export const SET_PASSWORD_SUBTITLE = 'Set up password to complete your signup.'
export const FORBIDDEN_EXCEPTION = "forbidden exception";
export const EMAIL_CHANGED_OR_NOT_VERIFIED_MESSAGE = "Email changed or not verified, please verify your email";
export const WRONG_EMAIL_OR_PASSWORD = "You have entered wrong email or password";
export const ADMIN_NOT_ACCESSIBLE = 'This user is not able to access admin panel.'
export const NOT_FOUND_EMAIL_MESSAGE = "No user found with this email";
export const FORGET_PASSWORD_SUCCESS = "An email has been sent to your registered email address";
export const ROOT_ROUTE = "/";
export const DASHBOARD_ROUTE = "/dashboard";
export const RESET_PASSWORD_FAILURE = "Reset password failed";
export const SET_PASSWORD_FAILURE = "Set password failed";
export const RESET_PASSWORD_SUCCESS = "Password reset successfully"
export const SET_PASSWORD_SUCCESS = "Password set successfully"
export const FOLLOW_INSTRUCTIONS = 'Please follow provided link in email to reset your password'
export const PASSWORD_VALIDATION_MESSAGE = "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character";
export const INVITE_NEW_USER = 'Invite new user'
export const USERS = 'Users'
export const DATE_FORMAT = "MM/DD/YYYY"
export const USER_UPDATE_SUCCESS = "User updated successfully"
export const AT_LEAST_ONE_ROLE_REQUIRED = "Please select at least one role"
export const INTERNAL_SERVER_ERROR = 'Internal server error'
export const USER_PASSWORD_SUCCESS = "User password updated successfully"
export const SEARCH_PLACEHOLDER = "Name, Joining Date, Role, etc"
export const PAGE_LIMIT = 10
export const NO_USER_FOUND = 'No user found'
export const USERS_TABLE_HEADERS = ['Staff', 'Joined on', 'Role', 'Status', 'Email verified', 'Actions']
export const UNABLE_TO_FETCH_ALL_CASE_TYPES = 'Unable to fetch all case types'
export const UNABLE_TO_FETCH_LAW_TYPE = 'Unable to fetch law type'
export const CASE_CREATED_SUCCESS = 'Case created successfully'

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#=+%&/,><':;|_~`])\S{8,99}$/
export const SPACES_REGEX = /^\S+(?: \S+)*$/
export const phoneReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const ssnReg = /^(\d{3}-?\d{2}-?\d{4})|(xxx-xx-xxxx)$/i;


export const sidebarLink = {
  dashboard: "Dashboard",
  cases: "Cases",
  courts: "Courts",
  users: 'Users',
}

export const DASHBOARD_LINK = [
  { title: sidebarLink.dashboard, link: '/dashboard' },
  { title: sidebarLink.cases, link: '/cases' },
  { title: sidebarLink.courts, link: '/courts' },
  { title: sidebarLink.users, link: '/users' }
]
export const AUTH_LINKS = {
  FORGET_PASSWORD_LINK: '/forgot-password',
  LOGIN_LINK: '/login',
  SET_PASSWORD: '/set-password',
  RESET_PASSWORD: '/reset-password',
}

export const LOGIN_FIELDS = [
  {
    title: "Email",
    fieldType: "email",
    name: "email",
  },
  {
    title: "Password",
    fieldType: "password",
    name: "password",
  }
]

export const SET_PASSWORD_FIELDS = [
  {
    title: "New Password",
    fieldType: "password",
    name: "password",
  },
  {
    title: "Confirm Password",
    fieldType: "password",
    name: "repeatPassword",
  }
]

export const INVITE_USER_FORM_FIELDS = [
  {
    title: "Email",
    fieldType: "email",
    name: "email",
  },
  {
    title: "First Name",
    fieldType: "text",
    name: "firstName",
  },
  {
    title: "Last Name",
    fieldType: "text",
    name: "lastName",
  }
]

export const GRAPHQL_QUERY_POLICY = {
  fetchPolicy: "network-only",
  nextFetchPolicy: "no-cache",
  notifyOnNetworkStatusChange: true,
} 