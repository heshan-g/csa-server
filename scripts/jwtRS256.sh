ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

# Move the keys to the "keys" directory
mkdir keys
mv jwtRS256.key jwtRS256.key.pub keys