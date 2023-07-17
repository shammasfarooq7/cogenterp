<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## INFRA
#### Prerequisites
- gcloud sdk/cli, Kubectl cli, helm (helm3 installation setups are added in following scripts)
- Make sure this json key is present in your root directory and make sure you don't commit it 'shining-relic-392816-f89ede29c1cd.json', I had put it in gitignore to avoid such scenerios.  
  
### Building and pushing image to gcr:
In order to build and push the image to gcr run following commands:
```
gcloud auth activate-service-account --key-file shining-relic-392816-f89ede29c1cd.json
gcloud config set core/project shining-relic-392816
gcloud builds submit --config=cloudbuild.yaml --substitutions=_COMMIT_SHA=latest
```

This `_COMMIT_SHA` tag need to have same value for client(frontend) service as well.  

### Cluster Setup
```bash
export GCP_PROJECT=shining-relic-392816
export GCP_REGION=europe-central2
export GCP_ZONE=europe-central2-b
export CUSTOM_PREFIX=shining

gcloud config set project ${GCP_PROJECT}
gcloud config set compute/zone ${GCP_ZONE}

# create a k8s cluster with  one preemtive node with e2-machine type
gcloud container clusters create ${CUSTOM_PREFIX} --zone ${GCP_ZONE} --machine-type e2-medium --num-nodes 1 --preemptible

# for fetching cluster get-credentials and set the current context in a kubeconfig file
gcloud container clusters get-credentials ${CUSTOM_PREFIX} --zone ${GCP_ZONE} --project ${GCP_PROJECT}
kubectl config use-context gke_${GCP_PROJECT}_${GCP_ZONE}_${CUSTOM_PREFIX}


# install helm 3
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh

rm get_helm.sh

helm repo add stable https://charts.helm.sh/stable
helm repo update

# create a static external IP to be configured with nginx 
gcloud compute addresses create ${CUSTOM_PREFIX}-ingress --region ${GCP_REGION}
export INGRESS_IP=$(gcloud compute addresses describe ${CUSTOM_PREFIX}-ingress --region ${GCP_REGION} | grep address: | sed -E 's/address:[[:space:]]+//')

# echo $INGRESS_IP
# 34.116.219.209

cat <<EOF >> nginx-custom.yaml
controller:
  metrics:
    service:
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "10254"
EOF

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm upgrade --install opeth ingress-nginx/ingress-nginx \
    --set controller.metrics.enabled=true \
    --set defaultBackend.enabled=true \
    --set controller.service.type=LoadBalancer \
    --set controller.service.loadBalancerIP=${INGRESS_IP} \
    -f nginx-custom.yaml

rm nginx-custom.yaml 

```
