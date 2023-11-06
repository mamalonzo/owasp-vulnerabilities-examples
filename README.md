# owasp-vulnerabilities-examples
Several small scale example applications based on the OWASP Top 10 2021.

## Limitations
Although it is intentionally vulnerable code, there is still a lack of error checking if you are trying to do something outside of the intended example. If something is not the focal point of the example such as password hashing, then it is ignored for simplicity. In a way this can mean all the examples also fit under the vulnerability of A04:2021 - Insecure Design. Code is also not styled as the functionality was the main focus. Overall these limitations may affect the overall realism but these programs are used to illustrate basic examples of each vulnerability.

## Requirements
For each of the examples, there is a file called requirements.txt which lists all the commands which must be executed in order to run the web application.

## Broken Access Control Example
To run this application, after installing all the requirements, you can simply type the command:
```
$ npm start
```
Then in a browse find your way to `http://localhost:3000` where you can perform the example:
- Register a new account with any details to gain access to the user profile screen
- Change the number for userId in the URL

You now have access to another user's data and can change various bits of information

## Cryptographic Failure Example
After installing the requirements, you can perform the example:
- Register a new user and/or take hashed password from the users.txt
- In brute_force.sh you can replace the password variable `password=3YBEKVGZCBKYOJ56ZZ7K3PULGM======`
- Run brute_force.sh

The decrypted password should be the last output and by inputting it at login, it should be successful

Note: Make sure to run `chmod u+x brute_force.sh` if permissions are disabled

## Identification and Authentication Failure Example
After installing requirements, also install:
```
$ npm install --global http-server
```
Ensure you have two terminals with one inside the backend directory. Then with the backend terminal, run:
```
$ npm start
```
Then the other terminal can run:
```
$ npx http-server frontend -p [port]
```
Where port can be any available port number. Then perform the example by going to `http://localhost:[port]`:
- Press the recover password button
- Enter the already existing user's email: bob@email.com and press the button

You will see the password in the modal and if you refresh the page, you can successfully login

## Improper Logging Example
After installing requirements run the command:
```
$ python3 app.py
```
Then make your way to `http://localhost:8080` and perform the example:
- See how the application works by inputting numbers or chars
- Manipulate the link using url encoding e.g. `http://localhost:8080/number?number=c%0A200%20INFO%3A+GET+%2Fnumber%3Fnumber%3Dnotreallog`

The log has gained two new entries, with one not being real

## Injection Example
After installing the requirements run the command:
```
$ python3 app.py
```
Then make your way to `http://localhost:8080` and perform the example:
- You can test the website by inputting username, entering answer to question, then going back
- Inside the username input box, you can enter `x', '0'); update users set score = score + 9999 where id=1; --`

When you refresh the page and input your username as 'Bob', they will have 9999 more points

## SSRF Example
For this example you need require an application that can send/intercept requests such as Burp Repeater.
After installing requirements, also install (if you haven't already):
```
$ npm install --global http-server
```
Ensure you have two terminals with one inside the backend directory. Then with the backend terminal, run:
```
$ npm start
```
Then the other terminal can run:
```
$ npx http-server frontend -p [port]
```
Where port can be any available port number. Then perform the example by going to `http://localhost:[port]`:
- When you press the button and view network traffic, you will see the internal server
- Use the request application to change the route to 'http://localhost:3000/admin/secret/' or change the URL in parameters

The request goes through and the response will contain the contents of secret-file.txt
