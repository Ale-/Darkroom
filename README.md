# slideshower
A generator of slideshows using Reveal.js and pandoc.

## Usage
Slideshower is intended to create a folder of slideshows that share a root folder with reveal.js in there. The slideshows use [pandoc](http://pandoc.org/) to generate the final html files from a markdown file that holds the data. 

There are defined some Gulp tasks to handle the slideshows:

```sh
gulp create --n your-new-slideshow-project-name
```
Creates a new project in the folder named after the `--n` flag, in the `slideshows` folder

```sh
gulp compile --n your-new-slideshow-project-name
```
Compiles the data contained in `index.md` following the template `template.html`. This operation creates a proper `index.html` file to hold the slideshow.

```sh
gulp watchdata --n your-new-slideshow-project-name
```
Watches and compiles the changes in `index.md`.

```sh
gulp sass --n your-new-slideshow-project-name
```
Compiles the sass file `style.sass` in the folder `style` of your project.

```sh
gulp watchsass --n your-new-slideshow-project-name
```
Watches and compiles the changes in `style.sass`
