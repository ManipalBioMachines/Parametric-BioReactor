# Parametric_BioReactor
A Parametric Bio-Reactor Design and Render Software that uses Cadquery to generate a CAD model of a Bio-Reactor

# Installation

## CADquery Installation
The python code relies on the CADquery library used to construct CAD geometry and export in .STEP or .STL format. CADquery requires Anaconda for installation and working. Anaconda can be installed from https://docs.anaconda.com/anaconda/install/windows/. Following which the next series of commands is executed in Powershell/CMD:

```
# Set up a new conda environement
conda create -n cadquery

# Activate the environment
conda activate cadquery

# Installing Cadquery in the environement
conda install -c conda-forge -c cadquery cadquery=2
```
## Jupyter-cadquery installation
After the above series of commands Jupyter-cadquery is installed in the conda environment:

```
pip install jupyter-cadquery==2.2.1 matplotlib

```
Note, this step is optional as jupyter-cadquery is a CAD renderer. This was used in the prototyping phase to enable us to view the created components. All branches apart from the main use jupyter-cadquery in the code.

## Node js installation
The following link can be used for installtion of Nodejs https://nodejs.org/en/download/ on Windows.

# Code

## Module.py
This file consists of all functions to create the components of each system. All units for the dimension calculation are in mm.

## Main.py
This file consists of the code required to execute the functions in module.py to construct components and combine them together, while finally exporting the STEP or STL file. 
The code details 2 functions, basic and advanced which correspond to the Basic and Advanced section of the webpage.

# Library documentation

### Anaconda
https://docs.anaconda.com/

### Node.js
https://nodejs.org/en/docs/

### CADquery
https://cadquery.readthedocs.io/en/latest/intro.html

### Jupyter-CADquery
https://github.com/bernhard-42/jupyter-cadquery
