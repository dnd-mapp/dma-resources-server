variable "TAGS" {
    default = [
        "latest"
    ]
    type = list(string)
}

target "default" {
    context = "."
    dockerfile = ".docker/Dockerfile"
    platforms = [
        "linux/amd64",
        "linux/arm64"
    ]
    tags = [
        for tag in TAGS: "ghcr.io/dnd-mapp/dma-web-client:${tag}"
    ]
    annotations = [
        "org.opencontainers.image.title=D&D Mapp - Web client",
        "index,manifest:org.opencontainers.image.description=The web client of the D&D Mapp platform",
        "org.opencontainers.image.authors=NoNamer777",
        "org.opencontainers.image.licenses=AGPL-3.0",
        "org.opencontainers.image.source=https://github.com/dnd-mapp/dma-web-client",
        "org.opencontainers.image.documentation=https://github.com/dnd-mapp/dma-web-client/blob/main/.docker/README.md",
    ]
    attest = [
        "type=provenance,mode=max",
        "type=sbom"
    ]
    cache-from = [
        "type=gha"
    ]
    cache-to = [
        "type=gha,mode=max,repository=dnd-mapp/dma-web-client"
    ]
}
