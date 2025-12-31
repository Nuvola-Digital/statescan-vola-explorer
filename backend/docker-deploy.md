# Docker Deployment

## Build and Push

Build the Docker image from the backend folder root:

```bash
docker buildx build --platform linux/amd64 -t harbor.nuvoladrive.dev/vola-statescan/statescan-common:v2.0.3 -f ./packages/account-scan/Dockerfile . --push
```

## Run

```bash
docker run --env-file ./.env harbor.nuvoladrive.dev/vola-statescan/statescan-common:v2.0.3
```

## Notes

- Build must be run from the `backend/` directory (repository root)
- The Dockerfile is located at `packages/account-scan/Dockerfile`
- The image uses `nodeLinker: node-modules` to allow dependency hoisting across workspace packages
