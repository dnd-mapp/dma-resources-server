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
        for tag in TAGS: "ghcr.io/dnd-mapp/dma-resources-server:${tag}"
    ]
    annotations = [
        "org.opencontainers.image.title=D&D Mapp - Resources server",
        "index,manifest:org.opencontainers.image.description=The resources server of the D&D Mapp platform from which static game resources like Classes, Backgrounds, Races, Spells, etc. are served from.",
        "org.opencontainers.image.authors=NoNamer777",
        "org.opencontainers.image.source=https://github.com/dnd-mapp/dma-resources-server",
        "org.opencontainers.image.documentation=https://github.com/dnd-mapp/dma-resources-server/blob/main/.docker/README.md",
    ]
    attest = [
        "type=provenance,mode=max",
        "type=sbom"
    ]
    cache-from = [
        "type=gha"
    ]
    cache-to = [
        "type=gha,mode=max,repository=dnd-mapp/dma-resources-server"
    ]
}
