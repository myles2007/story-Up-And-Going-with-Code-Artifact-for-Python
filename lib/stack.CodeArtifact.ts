import { Stack, StackProps } from "aws-cdk-lib";
import { CfnDomain, CfnRepository } from "aws-cdk-lib/aws-codeartifact";
import { Construct } from "constructs";

export class CodeArtifactStack extends Stack {
  codeArtifactRepo: CfnRepository;
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // Your code artifact domain is a collection of repositories.
    // Each domain can contain many repositories which can each contain many packages.
    // A unique package asset is only stored (and thus billed) once per domain, no matter
    // how many repositories it is in.
    const codeArtifactDomain = new CfnDomain(this, "codeArtifactDomain", {
      domainName: "up-and-going-with-code-artifact",
    });

    // Configures one repository in our domain to be a mirror of the public PyPi repository
    // This allows us to use the public PyPi repository as an upstream source for our private repository
    // In effect, we can install any public package from PyPi via our private repository if
    // this upstream source is configured.
    const pyPiPackageRepo = new CfnRepository(this, "publicPyPiMirror", {
      domainName: codeArtifactDomain.attrName,
      repositoryName: "pypi-mirror",
      externalConnections: ["public:pypi"],
    });

    // Create a new repository in our domain that will contain our private packages and any
    // upstreams we want to configure. In this case, we are configuring the public PyPi repository
    // as an upstream source for our private repository so that we can install any public package
    // from PyPi via our private repository as well.
    //
    // NOTE: We're only focusing on Python packages in this example, but CodeArtifact repositories
    //       are polyglot and support other package types in the same repository.
    const packageRepo = new CfnRepository(this, "privatePyPackageRepo", {
      domainName: codeArtifactDomain.attrName,
      repositoryName: "my-private-repo",
      upstreams: [pyPiPackageRepo.attrName],
    });
    this.codeArtifactRepo = packageRepo;
  }
}
