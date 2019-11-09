## Programmer's guide

### Tech-stack

* react
* redux
* router5
* local-storage
* custom plain CSS

### Concepts

The application at the top level is set of `categories`.
Each `category` is set of `modules`.

There are three main areas of the app:
* exercises
* results
* help

Initial view of the application offers links (buttons) to individual categories,
to overall results section, and overall help.

Each category offers links (buttons) to individual modules. It is the cateogry
that owns the runner of the modules' exercises.

Modules merely provide the exercise questions (and correct answers).

### Development

```
$ git clone ...
$ cd ...
$ yarn start  # to start the dev version

$ yarn test   # to run the linter:
```
