# Robot

Just for fun, a little (BB-8-esque) robot that repeatedly rolls across the screen.

I used this as an excuse to start playing with ES6/ES2015 and gulp.

## Building
You'll need [NodeJS](https://nodejs.org) installed first.

If you'll also need gulp: `sudo npm install -g gulp`

Then grab the repository:
```
git clone https://github.com/Ellyll/Robot.git
cd Robot
```

Install the node packages (this may take a while):
```
npm install
```

Then build with:
```
gulp
```
Note that this will build the app (placing files in `dist/`) then watch for changes to the html or js files, exit with `Ctrl-C`.