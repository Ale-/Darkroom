# slideshower
A generator of slideshows using Reveal.js and pandoc.

## Usage
Slideshower is intended to create a folder of slideshows that share a root folder with reveal.js. The slideshows use pandoc to generate the final html files from a markdown file that holds the data. The tool comes with a bash file to generate the folder with the files and create another bash script to compile the data.

For example, go and do:
    sudo chmod +x create
    ./create

The command will prompt for some information to create the slideshow folder, that will be created in the folder 'slideshows'.
In that folder do a:
    ./compile
to create the index.html.
