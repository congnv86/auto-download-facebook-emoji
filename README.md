# Auto Download Facebook Emoji

This is small tool to help you download all emoji from Facebook. For more detail, check [this link](https://www.facebook.com/groups/reactjs.vn/permalink/3355709057876345/?__cft__[0]=AZXLaBbcIRXEWQWalnPc_Aq12H3b5UFuRbonJKUrfW-tah4Y-JRtROf1c_jsBHsPS270nipL-6Iz3zIuaC8eVEvH5QMYJfNQUKE22i1S3v7kaaRpNets-JZi5WN0efxeQbO__4Q5D_KO8O74Au_qzujyNsOD2T2VwiezbzdYuGO3Br8B1nLA-gj5WyVJG9Tx7gw&__tn__=%2CO%2CP-R) to see how Facebook hashed the emoji urls. Use translation features of Facebook if you don't familiar with Vietnamese.

##  How to use?

* Fork this project
* Clone project to you local disk
* Run `npm install` to install some requirement packages
* Run `node index.js` [SIZE] [SAVED_TO_FOLDER]

Where:
* [SIZE]: one of supported sizes by Facebook: [16, 18, 20, 24, 28, 32, 56, 72, 96, 112, 128]
* [SAVED_TO_FOLDER]: URL to you dowload root folder

## Example:
`node index.js 16 ./download` Will download all emoji size 16x16 to folder `./download/16`
`node index.js 128 ./download` Will download all emoji size 128x128 to folder `./download/128`

> Note: There's a space between `[SIZE]` and `[SAVED_TO_FOLDER]`

Enjoy!
