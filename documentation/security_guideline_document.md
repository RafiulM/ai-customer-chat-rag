# Security Guidelines for ai-customer-chat-rag

## 1. Introduction
This document provides a comprehensive set of security guidelines tailored to the `ai-customer-chat-rag` monorepo. It covers design principles, implementation best practices, and operational controls to ensure the application is secure by design, robust in production, and resilient to common threats.

### 1.1 Scope
- Frontend: React 19 + Vite + TypeScript
- Backend: Express.js 4 + TypeScript
- AI Service: Google Gemini API integration
- Document processing: PDF/TXT/Markdown uploads and RAG store creation
- Deployment: Monorepo managed by Turbo & pnpm

## 2. Core Security Principles
1. **Security by Design:** Embed security at every phase—design, development, testing, and deployment.  
2. **Least Privilege:** Grant minimum permissions to users, processes, and services.  
3. **Defense in Depth:** Layer controls so that a single control failure does not compromise the system.  
4. **Fail Securely:** Ensure errors do not leak sensitive data or leave insecure states.  
5. **Secure Defaults:** Ship with safe configurations that require explicit relaxation.

## 3. Authentication & Access Control
Although the current prototype lacks user authentication, a production‐grade deployment must include:
- **Robust Authentication**: OAuth2/OpenID Connect or strong session‐based login.  
- **Password Policies**: Enforce complexity, minimum length, expiration (if storing credentials locally—prefer managed identity).  
- **Session Management**: Use secure, `HttpOnly`, `SameSite=Strict`, `Secure` cookies; enforce idle and absolute timeouts; rotate session IDs on privilege change.  
- **Role‐Based Access Control (RBAC)**: Define roles (e.g., user, admin) server‐side; validate authorization on every endpoint.  
- **Multi‐Factor Authentication (MFA)**: Encourage MFA for administrative or sensitive operations.

## 4. Input Handling & Validation
- **Server‐Side Validation**: Never trust client‐side checks—validate all inputs in Express routes and middleware.  
- **Type Enforcement**: Use TypeScript DTOs and runtime schema validation (e.g., `zod`, `Joi`).  
- **Prevent Injection**: Use parameterized queries/ORM for any DB interaction. Sanitize any shell or system calls.  
- **Template Safety**: Do not interpolate untrusted data into templates or innerHTML.

## 5. File Upload Security
- **Allowed Types & Sizes**: Strictly allow only PDF, TXT, Markdown; enforce both extension and MIME‐type checks; impose a sensible size limit (e.g., ≤ 10 MB).  
- **Storage Location**: Store uploads outside the webroot or in a dedicated blob storage with private ACLs.  
- **Filename Sanitization**: Strip path characters, normalize names, or generate server‐side UUID filenames.  
- **Malware Scanning**: Integrate antivirus or sandbox scanning before processing.  
- **Access Controls**: Ensure uploaded documents are only accessible to the user or role that owns them.

## 6. Data Protection & Cryptography
- **In Transit**: Enforce TLS 1.2+ on all endpoints (frontend, backend, Gemini API).  
- **At Rest**: If persisting RAG stores or logs, encrypt disks (e.g., KMS‐backed volumes).  
- **Sensitive Data**: Never log PII, secrets, or raw API responses. Mask or redact when necessary.  
- **Strong Algorithms**: Use AES-256 for encryption, SHA-256+ for integrity, and Argon2/bcrypt for any passwords.

## 7. Secrets & Configuration Management
- **No Hardcoding**: Never commit API keys, database credentials, or private keys.  
- **Environment Variables**: Use `.env.local` for local development; exclude from VCS.  
- **Secrets Store**: In production, use Vault/AWS Secrets Manager/Azure Key Vault.  
- **CI/CD Integration**: Inject secrets at build/deploy time, never store them in pipeline logs.

## 8. API & Service Security
- **HTTPS Only**: Redirect HTTP to HTTPS at the load‐balancer or express middleware.  
- **Rate Limiting & Throttling**: Apply per‐IP or per‐user limits (e.g., `express-rate-limit`).  
- **CORS**: Restrict `Access-Control-Allow-Origin` to known frontend domains.  
- **HTTP Methods**: Enforce correct verbs and reject unsupported ones.  
- **Versioning**: Prefix routes (`/api/v1/…`) to enable safe evolution.

## 9. Frontend Web Security Hygiene
- **Content Security Policy (CSP)**: Define a strict policy that limits script/style sources and disallows `unsafe-inline`.  
- **Secure Headers**: Use `helmet` or manual headers for:  
  - `Strict-Transport-Security`  
  - `X-Content-Type-Options: nosniff`  
  - `X-Frame-Options: DENY`  
  - `Referrer-Policy: no-referrer`  
- **CSRF Protection**: Implement anti-CSRF tokens for state‐changing API calls (e.g., `csurf`).  
- **Cookie Flags**: `HttpOnly`, `Secure`, `SameSite=Strict`.

## 10. Infrastructure & CI/CD Security
- **Harden Hosts**: Disable unused services, close unused ports, enforce OS updates.  
- **Immutable Deployments**: Use container images or immutable artifacts.  
- **Secrets in Flight**: Encrypt pipeline artifacts; restrict access.  
- **Scanning**: Integrate SCA (Dependabot, Snyk) and IaC scanning (Terraform Linter) into CI.  
- **Monitoring & Alerts**: Centralize logs (ELK/Datadog); set alerting on anomalies and error rates.

## 11. Dependency Management
- **Lockfiles**: Commit `pnpm-lock.yaml` to ensure deterministic installs.  
- **Minimize Packages**: Remove unused dependencies to shrink attack surface.  
- **Regular Updates**: Review and update dependencies quarterly or on high‐severity CVEs.  
- **Vulnerability Scanning**: Automate CVE checks on pull requests.

## 12. Monitoring, Logging & Incident Response
- **Structured Logging**: Log JSON events with minimal sensitive data.  
- **Error Tracking**: Integrate Sentry or similar for frontend/backend exceptions.  
- **Audit Trails**: Record critical actions (upload, queries, authentication) with timestamp, user, and IP.  
- **Incident Plan**: Document roles, communication channels, and remediation steps.

## 13. Security Testing & Auditing
- **Static Analysis**: ESLint, SonarQube for code smells and security hotspots.  
- **Dynamic Testing**: Weekly or pre-release pen tests and smoke scans.  
- **Unit & Integration Tests**: Cover `geminiService` logic, file‐upload handlers, and key React components.  
- **Fuzzing**: Test document parsers for malformed inputs.

## 14. Secure Defaults Checklist
- [ ] HTTPS enforced everywhere  
- [ ] CORS restricted to known origins  
- [ ] File‐upload limits and sanitization  
- [ ] Secrets managed in vault  
- [ ] Security headers applied  
- [ ] Rate limiting in place  
- [ ] CSP defined  
- [ ] Vulnerability scanning integrated

## 15. References
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- Google Cloud Security Best Practices: https://cloud.google.com/security/best-practices
- Microsoft Secure DevOps: https://docs.microsoft.com/azure/security/develop/secure-devops

---
By adhering to these guidelines, the `ai-customer-chat-rag` project will be better positioned to resist attacks, protect user data, and maintain trust.