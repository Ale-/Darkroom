# slideshower
A generator of slideshows using Reveal.js and pandoc.

## Usage
Slideshower is intended to create a folder of slideshows that share a root folder with reveal.js in there. The slideshows use [pandoc](http://pandoc.org/) to generate the final html files from a markdown file that holds the data. The tool comes with a bash file to generate the folder with the files and create another bash script to compile the data.

For example, go and do:
```bash
sudo chmod +x create
./create
```
The command will prompt for some information to create the slideshow folder, that will be created in the folder 'slideshows'.
In that folder do a:
```bash
./compile
```
to create a proper index.html.

TODO:
Add some gulp tasks to compile sass and md.
