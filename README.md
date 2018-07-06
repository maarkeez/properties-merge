# Properties merge

## Description

Can merge 2 properties files. Allows filtering by:
 - Equals lines.
 - Different lines.
 - Left side lines.
 - Right side lines.

After you choose wich lines to import, it generates a merged file with all the information.

Allows to check conflicts between files, with an "automate-merge" fucntionallity.


## Releases

| System		| Version 		| Link |
| ---      		| ---       	|---|
| Windows 32 	| 1.0.0        	|  [properties-merge-v.1.0.0](https://github.com/maarkeez/properties-merge/raw/master/Releases/1.0.0/properties-merge-win32-x64_v.1.0.0.rar) |





# Appendant
## Steps for install Electron

Update index.html
```
<base href="./">
``` 

Install electron for development mode
```
npm install electron --save-dev
```

After that, add main.js and update package.json with electron dependecies. 

Build with electron
```
npm run electron-build
```

Install packaging for Desktop Operating Systems
```
npm install electron-packager -g
npm install electron-packager --save-dev
```

Create executable for windows
```
electron-packager . --platform=win32
```