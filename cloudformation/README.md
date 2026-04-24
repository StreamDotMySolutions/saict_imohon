# RTM / RadioMuzik — CloudFormation Deployment Guide

All templates are stored on the bastion at `/home/ubuntu/cloudformation/`.

---

## Live Endpoints

| URL | Purpose |
|-----|---------|
| https://radiomuzik.com | Public website (root) |
| https://www.radiomuzik.com | Public website (www) |
| https://portal.radiomuzik.com | Staff portal (iMohon) |
| https://staging.radiomuzik.com | Staging portal |
| https://live.radiomuzik.com/muzikfm-audio-hls.m3u8 | MuzikFM HLS live stream |
| https://stream.radiomuzik.com/muzikfm | MuzikFM Icecast AAC stream |
| https://docs.radiomuzik.com | Documentation site |
| https://cms.radiomuzik.com | CMS (on bastion) |
| https://bastion.radiomuzik.com | Bastion SSH (56.69.33.230) |
| http://icecast-origin.radiomuzik.com | Icecast origin (internal, 43.216.131.143) |

---

## Infrastructure Overview

### AI VPC (`ai-vpc` — `vpc-06e057c830f490e07`)

CIDR: `10.10.0.0/16` | Region: `ap-southeast-5`

**Subnets:**

| Subnet ID | CIDR | AZ | Name |
|-----------|------|----|------|
| subnet-06824e2cb5a97860a | 10.10.1.0/24 | ap-southeast-5a | ai-vpc-public-az1 |
| subnet-047ba5efe25ca5081 | 10.10.2.0/24 | ap-southeast-5b | ai-vpc-public-az2 |
| subnet-08a0ddce2308fd755 | 10.10.10.0/24 | ap-southeast-5a | ai-vpc-private-az1 |
| subnet-059ee8604f736dff8 | 10.10.20.0/24 | ap-southeast-5b | ai-vpc-private-az2 |

**Security Groups:**

| SG ID | Name | Rules |
|-------|------|-------|
| sg-0b3f6709e3ef3b8f4 | ai-tts-security-group | SSH 22 from 0.0.0.0/0 |
| sg-072073630ed673e2c | default | All traffic from portal-vpc (10.0.0.0/16) and radio-vpc (192.168.0.0/16) |

**EC2 Instances (TTS — Text-to-Speech):**

| Instance ID | Name | Type | Private IP | Subnet | AMI |
|-------------|------|------|-----------|--------|-----|
| i-0cb32f24302d94417 | tts-1 | g6.4xlarge | 10.10.10.241 | ai-vpc-private-az1 | ami-0db28a93c072dcadd |
| i-0370288387351f7f4 | tts-2 | g6.4xlarge | 10.10.1.177 | ai-vpc-public-az1 | ami-0db28a93c072dcadd |
| i-07f961b7fc0dbf7fe | tts-staging | g6.4xlarge | 10.10.1.38 | ai-vpc-public-az1 | ami-0db28a93c072dcadd |

> All TTS instances use GPU instance type `g6.4xlarge` (NVIDIA L4). No public IPs assigned — accessed via bastion or TGW from portal-vpc. S3 access to `rtm-ai-radiomuzik`, `rtm-rcs-audio`, and `rtm-emergency-playlist` is via IAM role (`RCSAudioS3Role`).

---

### Portal VPC (`portal-vpc` — `vpc-02e129cd9a0d72fc5`)

CIDR: `10.0.0.0/16` | Region: `ap-southeast-5`

Hosts: `portal-1`, `portal-2` (m7i.xlarge), `portal-bastion` (56.69.33.230), `portal-db` (RDS MySQL 8.0.45), `portal-alb` (internet-facing).

---

### Radio VPC (`radio-vpc` — `vpc-0000a469e921f5835`)

CIDR: `192.168.0.0/16` | Region: `ap-southeast-5`

Hosts: Icecast origin server (43.216.131.143). Connected to on-premises MikroTik via Site-to-Site VPN (`radio-vpc-vgw`). Static route `10.50.0.0/24` via VGW.

---

## Prerequisites

- AWS CLI v2 installed and configured (`aws configure`)
- IAM permissions: CloudFormation full access, EC2, RDS, S3, IAM, Route 53, CloudFront, WAF
- Two deployment regions:
  - **ap-southeast-5** — main region (VPC, EC2, RDS, S3, IAM)
  - **us-east-1** — CloudFront + WAF (required by AWS)

---

## Stack Deployment Order

Deploy in this order — later stacks depend on earlier ones.

### Step 1 — Transit Gateway (ap-southeast-5)

```bash
aws cloudformation deploy \
  --region ap-southeast-5 \
  --stack-name rtm-tgw \
  --template-file vpc-transit-gateway.yaml \
  --capabilities CAPABILITY_NAMED_IAM
```

Wait for `CREATE_COMPLETE` before proceeding.

---

### Step 2 — VPCs (ap-southeast-5)

Deploy all three VPCs. Order within this step does not matter.

```bash
# portal-vpc (10.0.0.0/16)
aws cloudformation deploy \
  --region ap-southeast-5 \
  --stack-name rtm-vpc-portal \
  --template-file vpc-portal.yaml

# ai-vpc (10.10.0.0/16)
aws cloudformation deploy \
  --region ap-southeast-5 \
  --stack-name rtm-vpc-ai \
  --template-file vpc-ai.yaml

# radio-vpc (192.168.0.0/16) — includes VGW + VPN to MikroTik
aws cloudformation deploy \
  --region ap-southeast-5 \
  --stack-name rtm-vpc-radio \
  --template-file vpc-radio.yaml
```

After deploying `rtm-vpc-radio`, go to **VPC → Transit Gateway Route Tables** in the console and add the attachment routes for the radio VPC manually if auto-propagation is not enabled.

---

### Step 3 — S3 Buckets (ap-southeast-5)

```bash
aws cloudformation deploy \
  --region ap-southeast-5 \
  --stack-name rtm-s3-buckets \
  --template-file s3-buckets.yaml
```

> **Note:** The `portal-docs-radiomuzik` bucket policy for CloudFront OAC is applied automatically once you provide the `DocsOACId` parameter (output from Step 5 below). On first deploy, leave it empty and update after Step 5.

---

### Step 4 — IAM (ap-southeast-5)

```bash
# Groups, managed policies, EC2 roles, instance profiles
aws cloudformation deploy \
  --region ap-southeast-5 \
  --stack-name rtm-iam-groups \
  --template-file iam-groups-policies.yaml \
  --capabilities CAPABILITY_NAMED_IAM

# Console and service users
aws cloudformation deploy \
  --region ap-southeast-5 \
  --stack-name rtm-iam-users \
  --template-file iam-users.yaml \
  --capabilities CAPABILITY_NAMED_IAM
```

> **After deploy:** Assign users to groups manually via IAM console, and set initial passwords for console users (they have `PasswordResetRequired: true`).

---

### Step 5 — Portal Infrastructure (ap-southeast-5)

Requires `DBPassword` (not stored in the template).

```bash
aws cloudformation deploy \
  --region ap-southeast-5 \
  --stack-name rtm-portal-infra \
  --template-file portal-infrastructure.yaml \
  --parameter-overrides DBPassword=<YOUR_DB_PASSWORD> \
  --capabilities CAPABILITY_NAMED_IAM
```

**Key parameters (defaults already set in template):**

| Parameter | Default | Notes |
|-----------|---------|-------|
| `VpcId` | `vpc-02e129cd9a0d72fc5` | portal-vpc |
| `PortalAMI` | `ami-04c7b81f22c04be89` | Update if using new AMI |
| `InstanceType` | `m7i.xlarge` | |
| `DBPassword` | — | Required, no default |
| `ALBCertificateArn` | set | ACM cert ap-southeast-5 |
| `CloudFrontPrefixListId` | `pl-09076f83e90b139d0` | CF origin prefix list |

After deploy, note the `ALBDNSName` and `ALBHostedZoneId` outputs — needed for Route 53.

---

### Step 6 — CloudFront + WAF (us-east-1)

All CF/WAF stacks **must** be deployed in `us-east-1`.

#### 6a — Staging

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name rtm-staging-cf-waf \
  --template-file staging-cf-waf.yaml \
  --capabilities CAPABILITY_NAMED_IAM
```

#### 6b — Portal (radiomuzik.com + www + portal)

Requires `ALBDNSName` and `ALBHostedZoneId` from Step 5 outputs.

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name rtm-portal-cf-waf \
  --template-file portal-cf-waf.yaml \
  --parameter-overrides \
    ALBDNSName=<ALB_DNS_FROM_STEP5> \
    ALBHostedZoneId=<ALB_ZONE_ID_FROM_STEP5>
```

#### 6c — Media (live / stream / docs)

Requires ACM cert ARNs (us-east-1) and MediaPackage endpoint.

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name rtm-media-cf \
  --template-file cloudfront-media.yaml \
  --parameter-overrides \
    MediaPackageEndpoint=<MEDIAPACKAGE_ENDPOINT_HOSTNAME> \
    LiveCertificateArn=arn:aws:acm:us-east-1:759371407156:certificate/<LIVE_CERT_ID> \
    StreamCertificateArn=arn:aws:acm:us-east-1:759371407156:certificate/<STREAM_CERT_ID> \
    DocsCertificateArn=arn:aws:acm:us-east-1:759371407156:certificate/<DOCS_CERT_ID>
```

After deploy, get `DocsOACId` from outputs and update the S3 stack:

```bash
aws cloudformation deploy \
  --region ap-southeast-5 \
  --stack-name rtm-s3-buckets \
  --template-file s3-buckets.yaml \
  --parameter-overrides DocsOACId=<OAC_ID_FROM_MEDIA_CF_OUTPUT>
```

---

### Step 7 — Route 53 (ap-southeast-5)

Requires `ALBDNSName` and `ALBHostedZoneId` from Step 5 outputs.

```bash
aws cloudformation deploy \
  --region ap-southeast-5 \
  --stack-name rtm-route53 \
  --template-file route53-radiomuzik.yaml \
  --parameter-overrides \
    ALBDNSName=<ALB_DNS_FROM_STEP5> \
    ALBHostedZoneId=<ALB_ZONE_ID_FROM_STEP5>
```

> **Warning:** If `radiomuzik.com` is already registered and has an active hosted zone, **do not deploy this stack** — it will create a duplicate. Instead, update records manually or import the existing zone.

---

## Checking Stack Status

```bash
# List all stacks
aws cloudformation list-stacks \
  --region ap-southeast-5 \
  --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE

# Get stack outputs
aws cloudformation describe-stacks \
  --region ap-southeast-5 \
  --stack-name rtm-portal-infra \
  --query "Stacks[0].Outputs"
```

---

## Stack Summary

| Stack name | Template | Region | Depends on |
|-----------|---------|--------|------------|
| `rtm-tgw` | `vpc-transit-gateway.yaml` | ap-southeast-5 | — |
| `rtm-vpc-portal` | `vpc-portal.yaml` | ap-southeast-5 | rtm-tgw |
| `rtm-vpc-ai` | `vpc-ai.yaml` | ap-southeast-5 | rtm-tgw |
| `rtm-vpc-radio` | `vpc-radio.yaml` | ap-southeast-5 | rtm-tgw |
| `rtm-s3-buckets` | `s3-buckets.yaml` | ap-southeast-5 | — |
| `rtm-iam-groups` | `iam-groups-policies.yaml` | ap-southeast-5 | — |
| `rtm-iam-users` | `iam-users.yaml` | ap-southeast-5 | — |
| `rtm-portal-infra` | `portal-infrastructure.yaml` | ap-southeast-5 | rtm-vpc-portal |
| `rtm-staging-cf-waf` | `staging-cf-waf.yaml` | **us-east-1** | — |
| `rtm-portal-cf-waf` | `portal-cf-waf.yaml` | **us-east-1** | rtm-portal-infra |
| `rtm-media-cf` | `cloudfront-media.yaml` | **us-east-1** | rtm-s3-buckets |
| `rtm-route53` | `route53-radiomuzik.yaml` | ap-southeast-5 | rtm-portal-infra, rtm-media-cf |

---

## Deleting Stacks

Delete in reverse order. Some resources have deletion protection:

- `portal-db` (RDS) — has `DeletionProtection: true` and `DeletionPolicy: Snapshot`. Disable protection first via console before deleting the stack.
- S3 buckets — must be empty before CloudFormation can delete them.

```bash
# Example: delete portal infra
aws cloudformation delete-stack \
  --region ap-southeast-5 \
  --stack-name rtm-portal-infra
```
