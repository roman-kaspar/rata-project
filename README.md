## rata-project

rata-project is a set of school exercises that I wrote for my children. Since they got their mobile phones
for Xmas at the end of 2018, I wanted them to spend at least some amount of time with something meaningful
(besides all the games they installed there).

Sure, there are hundreds of educational games, but I wanted something tailored for them, something that
could follow their progress at school. Also, most of the games are in English and focus on one subject.
I wanted to have something in Czech and for all the subjects at once (mathematics, Czech, and English
to start with).

Finally, I use this as a negotiation tool with my children. Do you want to play on Playstation?
Do you want to install a new game on your phone? Do you want to watch this movie? Then go, do some
exercirses in your phone and then come back.

### PWA, hosting

The application is written as a Progressive Web Application (PWA). It means that it works from the browser,
but uses caching mechanisms and web worker process, so that it is fully working even when completely offline.

One of the properties of PWAs is that you can use menu in the mobile browser and pick "Add to home screen"
and then the web application behaves as any other application installed from App Store.

The application is hosted at [https://rata.roman-kaspar.cz/)](https://rata.roman-kaspar.cz/).

Once installed the application (when online) pings the server to check for newer versions. When available,
the app will auto-update to the newest version.

### App concepts, goals

There are three main areas of the app:
* exercises
* results
* help

The exercises are grouped into categories (e.g. mathematics - integer calculus).
The results and help follow the same hierarchy.

There are three goals of the exercises:
* correctness (correct answers)
* speed
* repeatable fast and correct answers

User (child) collects stars, up to three stars per exercise (one for all correct answers, second for correct
and fast answers, and third for three correct and fast answers in row).

The system remembers wrong (and slow) answers and asks them repeatedly, until correct (or correct and fast)
answer is provided.

### Tech-stack

* react
* redux
* router5
* local-storage + data encryption
* custom plain CSS

### Development

```
$ git clone ...
$ cd ...
$ yarn start  # to start the dev version

$ yarn test   # to run the linter
$ yarn build  # to create production bundle
```

### Code structure

TODO.

### License

The MIT License (MIT)

Copyright (c) 2020 Roman Kaspar <roman.kaspar@seznam.cz>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

