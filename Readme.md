# 🚀 DevOps Demo — End‑to‑End GitOps CI/CD & Observability Platform

> A production‑style DevOps project demonstrating **secure CI**, **GitOps‑based CD**, **Kubernetes orchestration**, and **full observability** using Jenkins, Docker, Helm, Argo CD, Prometheus, and Grafana.

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [What This Project Demonstrates](#-what-this-project-demonstrates)
3. [High‑Level Architecture](#-high-level-architecture)
4. [Architecture Diagram](#-architecture-diagram)
5. [Repository Structure](#-repository-structure)
6. [Application Design](#-application-design)
7. [CI Pipeline (Jenkins)](#-ci-pipeline-jenkins)
8. [GitOps CD Flow (Argo CD + Helm)](#-gitops-cd-flow-argo-cd--helm)
9. [Kubernetes Architecture](#-kubernetes-architecture)
10. [Ingress & Networking](#-ingress--networking)
11. [Observability Stack](#-observability-stack)
12. [Alerting Strategy](#-alerting-strategy)
13. [Security & Quality](#-security--quality)
14. [Failure Scenarios Tested](#-failure-scenarios-tested)
15. [How to Run Locally](#-how-to-run-locally)
16. [Production Design Notes](#-production-design-notes)
17. [Key Learnings](#-key-learnings)
18. [Future Enhancements](#-future-enhancements)

---

# 🔥 Project Overview

This project implements a **real‑world DevOps workflow** where:

• Developers push code to GitHub
• Jenkins executes CI (security scans, quality gates, image build & push)
• Jenkins updates Helm values and commits back to Git
• Argo CD automatically syncs the change to Kubernetes (GitOps)
• Kubernetes rolls out new versions safely
• Prometheus monitors infrastructure and application metrics
• Grafana visualizes health, performance, and reliability
• Alertmanager fires alerts for failures

This is not a demo pipeline. This is a **production‑style system design**.

---

# 🎯 What This Project Demonstrates

✅ Secure CI pipeline (Jenkins + Trivy + OWASP + SonarQube)
✅ Immutable Docker image workflow
✅ Helm‑based application packaging
✅ GitOps continuous delivery using Argo CD
✅ Kubernetes orchestration & health management
✅ Ingress‑based traffic routing
✅ Full observability (metrics + dashboards + alerts)
✅ Real operational debugging (probes, resources, sync, restarts)

---

# 🏗 High‑Level Architecture

```
Developer
   │
   ▼
GitHub ───────────────▶ Jenkins CI
  │                        │
  │                        ├── Trivy (Security)
  │                        ├── OWASP (Dependencies)
  │                        ├── SonarQube (Quality)
  │                        ├── Docker Build & Push
  │                        └── Update Helm values.yaml
  │                                   │
  ▼                                   ▼
GitHub (GitOps repo) ◀──────────── Commit Image Tag
  │
  ▼
Argo CD ─────▶ Helm ─────▶ Kubernetes Cluster
                                │
                                ▼
                        DevOps Demo Application
                                │
                                ▼
                       Prometheus ───▶ Grafana
                                │
                                ▼
                            Alertmanager
```

---

# 🧩 Architecture Diagram

📸 _(Add diagram image here)_

Suggested diagram layers:
• Developer → GitHub → Jenkins CI
• Jenkins → Docker Hub
• Jenkins → GitHub (values.yaml update)
• Argo CD → Kubernetes
• Kubernetes → Prometheus → Grafana → Alerts

---

# 📁 Repository Structure

```
.
├── app/
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
│
├── k8s/
│   ├── devops-demo/        # Helm chart
│   │   ├── Chart.yaml
│   │   ├── values.yaml
│   │   └── templates/
│   │       ├── deployment.yaml
│   │       ├── service.yaml
│   │       └── ingress.yaml
│   │
│   └── monitoring/
│       ├── servicemonitor.yaml
│       └── devops-demo-alerts.yaml
│
├── jenkins/Jenkinsfile
└── README.md
```

---

# ⚙ Application Design

Simple Node.js service exposing:

• `/health` — liveness/readiness checks
• `/version` — version reporting
• `/metrics` — Prometheus metrics

Metrics exposed using **prom-client**:

• http_requests_total
• default Node.js process metrics

Designed for:

• container‑native behavior
• Kubernetes health probes
• observability‑first approach

---

# 🔄 CI Pipeline (Jenkins)

Jenkins performs **build‑time responsibility only**.

### Pipeline stages:

1. Parameter validation
2. Workspace cleanup
3. Git clone
4. Trivy filesystem scan
5. OWASP dependency check
6. SonarQube code analysis
7. Quality gate enforcement
8. Docker build
9. Docker push to DockerHub
10. Update Helm values.yaml
11. Git commit & push (GitOps trigger)

### Key principle:

Jenkins **never deploys** to Kubernetes.
It only updates Git.

---

# 🔁 GitOps CD Flow (Argo CD + Helm)

Argo CD continuously monitors:

```
k8s/devops-demo/
```

When Jenkins updates `values.yaml`:

• Argo CD detects Git change
• Renders Helm chart
• Applies manifests
• Kubernetes performs rolling update

Deployment is:

• declarative
• auditable
• reversible

---

# ☸ Kubernetes Architecture

• Namespace‑isolated workloads
• Helm‑managed releases
• Health probes configured
• Resource requests & limits
• Rolling deployments
• Service discovery via ClusterIP

Key reliability controls:

• readiness probes
• liveness probes
• replica management
• automatic restarts

---

# 🌐 Ingress & Networking

• NGINX Ingress Controller
• Host‑based routing
• Cluster‑internal service discovery

Provides:

• external access
• DNS‑style routing
• production‑style traffic management

---

# 📊 Observability Stack

## Prometheus

Collects:

• Kubernetes cluster metrics
• pod health
• resource utilization
• application metrics

Scraping configured via **ServiceMonitor**.

---

## Grafana

Dashboards created for:

• pod CPU & memory
• restarts
• availability
• request volume
• error visibility

Grafana acts as the **single source of operational truth**.

---

# 🚨 Alerting Strategy

PrometheusRule configured for:

• Application down
• Pod restart loops
• High memory consumption

Alerts evaluated by Prometheus and sent to Alertmanager.

Designed for:

• early detection
• low noise
• operational actionability

---

# 🔐 Security & Quality

• Trivy — container & filesystem scanning
• OWASP Dependency‑Check — vulnerable libraries
• SonarQube — code quality & maintainability

Pipeline blocks deployment on:

• critical vulnerabilities
• failed quality gates

---

# 🧪 Failure Scenarios Tested

• Broken Docker images
• Failing liveness probes
• Resource starvation
• Argo CD drift scenarios
• Grafana secret resets
• Kubernetes restart loops

Each incident was:

• observed
• diagnosed
• corrected

---

# ▶ How to Run Locally

### Prerequisites

• Docker Desktop (6–8GB RAM)
• kind
• kubectl
• helm

### Create cluster

```
kind create cluster --name devops
```

### Install ingress

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

### Install monitoring

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
```

### Install Argo CD

```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### Apply Argo Application

```
kubectl apply -f argocd-app.yaml
```

---

# 🧠 Production Design Notes

In real environments this system would include:

• separate environments (dev/stage/prod)
• sealed secrets / external secret managers
• HPA & VPA
• canary or blue‑green deployments
• multi‑cluster Argo CD
• SLO‑driven alerting

---

# 📚 Key Learnings

• GitOps improves auditability and stability
• CI and CD must remain decoupled
• health probes are critical
• observability is not optional
• systems fail in unexpected ways
• control plane health matters

---

# 🚀 Future Enhancements

• AWS EKS deployment
• Canary rollout strategies
• Chaos testing
• Centralized logging (Loki/ELK)
• Secrets manager integration

---

# 👨‍💻 Author

Ashutosh Kumar
DevOps / Cloud / Platform Engineering

---

If you are studying this project:

👉 Don’t just run it. Break it. Observe it. Fix it.

That is real DevOps.
