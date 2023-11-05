# Written by: Marc Malonzo
# This is deciphers a DES encrypted message from the login.

import sys
import base64
from Crypto.Cipher import DES

# Decrypts a message using DES and returns the plaintext
def decrypt(message, key):
    key = bytes(key, "utf-8")
    cipher = DES.new(key, DES.MODE_ECB)
    encrypted = base64.b32decode(message)
    return str(cipher.decrypt(encrypted)).strip("b'")

def main():
    print(decrypt(sys.argv[1], sys.argv[2]))

if __name__ == "__main__":
    main()