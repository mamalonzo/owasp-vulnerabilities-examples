#!/bin/dash
# Written by: Marc Malonzo
# Simple proof of concept brute force script to decrypt all files in the directory

python3 decrypt.py

# Password of 1 user but can make another loop to same key on all users
password="3YBEKVGZCBKYOJ56ZZ7K3PULGM======"

# Read dictionary.txt line by line and decrypt with password
while read -r line
do
    echo "$line"
    python3 decrypt.py "$password" "$line"
done < dictionary.txt