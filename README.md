To work with this frontend code locally with the swagger-api server,
please run another server to serve the frontend.
To do this, run:

`$ python3 SAP_backEnd.py`

This will start up a HTTP server where if you navigate to `http://127.0.0.1:5000/` (or whatever URL it provides) it will run your `index.html`

Currently this project just simulate the login/logout/register-progress

# Login

- When the user isn't logged in, the site shall present a login form that contains:
  - a username field (text)
  - a password field (password)
  - a submit button to login
- When the submit button is pressed, the form data should be sent to `POST /auth/login` to verify the credentials. If there is an error during login an appropriate error should appear on the screen.
- Once the user is logged in, they should be able to see the Main-Page which says "Not yet implemented"

# Registration

- When the user isn't logged in, one can click the button to register with these infomation:
  - a username field (text)
  - a password field (password)
  - a confirm password field (password) - not passed to backend, but error thrown on submit if doesn't match other password
  - an email address (text)
  - a name (text)
- When the submit button is pressed, the form data should be sent to `POST /auth/signup` to verify the credentials. If there is an error during login an appropriate error should appear on the screen.

# Error info

- Whenever the frontend or backend produces an error, there shall be an error popup on the screen with a "close" button.
