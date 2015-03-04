# slideshower
slideshower is a project forked somehow from _Reveal.js_, intended for people who need to create presentations on a regular basis. 
It has three main differences with a regular _Reveal_ installation:
* Instead of downloading instances of _Reveal_ library for each project in this case it has a common folder with only an instance of _Reveal.js_ and a folder of projects, managed by Gulp tasks. 
* Instead of coupling data and representation in the `index.html` as _Reveal.js_ does this flavour takes advantage of mighty [pandoc](http://pandoc.org/) (as a [node module](https://www.npmjs.com/package/gulp-pandoc), handled by _Gulp_) to have a markdown file with the data, `index.md`. This design makes easy to maintain the data and code (and, no way, who doesn't prefer markdown to html?). 
* It's intended to be used with [Sass](http://sass-lang.com/). And if you don't know Sass yet, go right now and learn about it.

## Installation
To install it, clone it with a `--recursive` flag on, to enable the cloning of _Reveal_ (contained as a submodule of _slideshower_):
```sh
git clone --recursive https://github.com/Ale-/slideshower/
```
If you don have node install it:
```sh
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs
```
Install Gulp dependencies:
```sh
sudo npm install
```
And you're done!


## Usage

### Create your first project:
```sh
gulp create --n your-new-slideshow-project-name
```

### Modify the data

Each `# (h1)` will be considered a slide in the compiled `index.html`:
```md
# First slide
My content

# Second slide
Another content
```
To create a vertical layout, embed `## (h2)` under a common title:
```md
# Common title for my vertical layout

## First slide in the stack
Content

## Second slide in the stack
Content
```
And probably that's all you need to know. Use regular markdown syntax in the content and that's it.

### Compile the results

Now it's time to see the results. So compiles the data contained in `index.md`. That will follow the template defined in `template.html`. This operation creates a proper `index.html` file to hold the slideshow.
```sh
gulp compile --n your-new-slideshow-project-name
```
Or watch the changes in the file (live reload to come) :
```sh
gulp watchdata --n your-new-slideshow-project-name
```

### Give some nice style

For that modify the `style.css` in the `style` folder o use a `style.sass` file and compile it: 
```sh
gulp sass --n your-new-slideshow-project-name
```
or watch it:

```sh
gulp watchsass --n your-new-slideshow-project-name
```

