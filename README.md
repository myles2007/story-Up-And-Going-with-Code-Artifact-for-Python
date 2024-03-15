# Welcome
This project is intended to be used alongside my Medium story titled: Up and Going with AWS CodeArtifact (for Python)

The project structure is reflective of `cdk init app --languge=typescript` and defines two primary things:

 - A CodeArtifact deployment, configured with PyPi as an upstrema source for
   public packages
 - A simple Python package, complete with scripts to publish it to CodeArtifact
   as a private package
 - A simple Python application which requires and uses the privately published
   package and a public one, both sourced from the CodeArtifact reposistory we
   deployment


Please see [my Medium story](https://medium.com/p/9030e33eea6) as a guide for this repository.

