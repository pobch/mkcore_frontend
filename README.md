# Survey Room Application

## STATUS: 
Developing

## Demo : 
https://mkcore-app.herokuapp.com

## What the purpose of this app?
Survey owners can create their own surveys/questions, and then receive the unique code. Each survey will match with 1 unique code, which is used for accessing to answer the survey. On the other hand, only Guest users who have the code will be able to access to the survey and answer all questions.  

## How to use:
1. Sign up with e-mail address
2. Confirm account by a confirmation link in your mailbox
3. Log in
4. For Survey owners:
  - Click 'Create' button and fill the form to create the room first
  - If there is not any errors, the created room will be shown on the list
  - Click 'Edit' button to edit the room's details or create a survey
  - On edit-survey page, you can add/delete a question, choose an answer type either text or multiple choices
  - You can add/delete a choice
  - Give the 'Room Code' and 'Room Password' to target users who will answer the created survey
5. For Guest users who want to answer the survey:
  - Click 'Join' button and fill the 'Room Code' and 'Room Password'
  - If joining completed, the joined room will be on the list
  - Click 'Edit Survey' to access and answer the survey

## Generating SSL for local development
In order to login via facebook, https redirect URL need to be used.
```
mkdir temp
openssl genrsa -des3 -out temp/rootCA.key 2048
openssl req -x509 -new -nodes -key temp/rootCA.key -sha256 -days 1024 -out temp/rootCA.pem


# Create CSR File
cat > temp/server.csr.cnf <<EOL
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn

[dn]
C=TH
ST=Bangkok
L=Bangkok
O=Makrub
OU=Development
emailAddress=system.admin@makrub.com
CN = localhost
EOL
```

```
# V3 Ext file
cat > temp/v3.ext <<EOL
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
EOL
```

```
openssl req -new -sha256 -nodes -out temp/server.csr -newkey rsa:2048 -keyout temp/server.key -config <( cat temp/server.csr.cnf )
openssl x509 -req -in temp/server.csr -CA temp/rootCA.pem -CAkey temp/rootCA.key -CAcreateserial -out temp/server.crt -days 500 -sha256 -extfile temp/v3.ext
```
