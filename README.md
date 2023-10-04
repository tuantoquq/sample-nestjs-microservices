<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Sample Microservices with NestJS using TCP protocol to communicate between each service.

## Start

### 1. With docker

- Start in development env:

```bash
$ docker compose -f docker-compose.dev.yml up --build
```

- Start in production env:

```bash
$ docker compose -f docker-compose.prod.yml up --build
```

### 2. With Kubernetes

- Firstly, we need create some secrets using for this K8s cluster.

Create secret for MongoDB URI

```bash
$ kubectl create secret generic mongodb --from-literal=connectionString=<connection_string>
```

Create secret for Stripe:

```bash
$ kubectl create secret generic stripe --from-literal=apiKey=<stripe_api_key>
```

Create secret for emails notify:

```bash
$ kubectl create secret generic emails --from-literal=appPassword=<email_app_password>
```

- After creating all secrets, we can start microservices with K8s:

```bash
$ cd k8s/mcr-tcp

$ helm install <cluster_name> .
```
