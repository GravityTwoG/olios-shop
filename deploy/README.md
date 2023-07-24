to run with sudo privelegies use -b flag

to pass sudo password use -K flag

if you use ssh key with passphrase then do it in shell

```sh
eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_rsa
```
