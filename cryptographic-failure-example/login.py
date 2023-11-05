# Written by: Marc Malonzo
# This is a simple login app that stores user details in a file.
# The app has cryptographic vulnerabilities due to using DES, an outdated and insecure cipher.

from Crypto.Cipher import DES
import base64

key = b'MOUNTAIN'

# Encrypts a message using DES and returns the base32 encoded ciphertext
def password_encrypt(message):
    message = message + " " * (8 - len(message) % 8)
    cipher = DES.new(key, DES.MODE_ECB)
    return str(base64.b32encode(cipher.encrypt(message))).strip("b'")

# Checks user details against the users.txt file
def login():
    username = input("Username: ")
    password = input("Password: ")

    with open("users.txt", "r") as f:
        for line in f:
            check_username, check_password = line.strip().split(":")
            if check_username == username:
                if check_password == password_encrypt(password):
                    print("Login successful!")
                    return
                else:
                    print("Invalid password.")
                    return
        print("User not found.")

# Registers a new user
def register():
    username = input("Username: ")
    password = input("Password: ")

    with open("users.txt", "a") as f:
        f.write(username + ":" + str(password_encrypt(password)) + "\n")

    print("User registered successfully.")
    
def main():
    action = input("What would you like to do? (login, register): ")
    if action == "login":
        login()
    elif action == "register":
        register()
    else:
        print("Invalid action.")

if __name__ == "__main__":
    main()