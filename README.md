# musical-note

[![Code Climate](https://codeclimate.com/github/danigb/musical-note/badges/gpa.svg)](https://codeclimate.com/github/danigb/musical-note)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

_(Western, well tempered)_ note in javascript.

```js
var Note = require('musical-note')
Note('F#4')
Note('C').transpose('M3')
```

### Usage

Install with npm: `npm i --save musical-note` and require the library:

```js
var Note = require('musical-note')
```

### API

### Note(string)

Create a note object from string. The note object has the following properties:

- name: the pitch class (in upper case) with alterations. For example: `C#`, `Dbb`
- oct: the octave (an integer, can be negative)
- midi: the midi number (integer)
- freq: the note frequency (usin 440hz as A4)

### note.transpose(interval)

Returns the name of the note transposed by an interval

```js
Note('C4').transpose('M2') // => 'D4'
```

### note.distance(note)

Returns an interval name of the distance from the note to the given one.

```js
Note('C4').distance('D4') // => 'M2'
```

### note.enharmonics()

Returns an array of strings with the note enharmonics. For example:

```js
Note('C#4').enharmonics() // => ['Db4', 'B##3']
```

See [enharmonics](https://github.com/danigb/enharmonics) for more info.
