
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** ai-customer-chat-rag
- **Date:** 2025-11-12
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001
- **Test Name:** User Authentication Success with Clerk
- **Test Code:** [TC001_User_Authentication_Success_with_Clerk.py](./TC001_User_Authentication_Success_with_Clerk.py)
- **Test Error:** The sign-up process is blocked by failed security validations despite using valid credentials. This prevents creating a new user account and testing sign-in functionality. The task cannot proceed further until this issue is resolved. Reporting the issue and stopping the task now.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliX2ewH9jX1tfBh1krkUIWM3:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliX2ewH9jX1tfBh1krkUIWM3:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliX2ewH9jX1tfBh1krkUIWM3:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/cab495d2-6080-4883-a012-ba0891d43107
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002
- **Test Name:** Fallback Admin User Authentication for Unauthenticated Requests
- **Test Code:** [TC002_Fallback_Admin_User_Authentication_for_Unauthenticated_Requests.py](./TC002_Fallback_Admin_User_Authentication_for_Unauthenticated_Requests.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/3fbbd1ce-c7fd-4900-80bf-16c398484139
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003
- **Test Name:** Document Upload - Supported File Types
- **Test Code:** [TC003_Document_Upload___Supported_File_Types.py](./TC003_Document_Upload___Supported_File_Types.py)
- **Test Error:** The sign-up process is blocked by security validation errors, preventing account creation and access to the document upload interface. Therefore, the task to validate document upload functionality cannot proceed. Reporting this issue and stopping the task.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NljUOJR2YsKmXF1zotH8XeGir:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NljUOJR2YsKmXF1zotH8XeGir:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NljUOJR2YsKmXF1zotH8XeGir:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/7aff3baa-4635-4a96-8366-fed6b5d56a68
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004
- **Test Name:** Document Upload - Unsupported File Types
- **Test Code:** [TC004_Document_Upload___Unsupported_File_Types.py](./TC004_Document_Upload___Unsupported_File_Types.py)
- **Test Error:** Stopped testing because account creation is blocked by security validations, preventing access to the upload component. Cannot test unsupported file uploads without authentication. Reported the issue.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliLJyYo4l58Hfe2JuMXzhoU0:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliLJyYo4l58Hfe2JuMXzhoU0:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliLJyYo4l58Hfe2JuMXzhoU0:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/8b55c6d4-7481-4612-b1fc-2bc841a8e09b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005
- **Test Name:** RAG Store Creation with Unique Names
- **Test Code:** [TC005_RAG_Store_Creation_with_Unique_Names.py](./TC005_RAG_Store_Creation_with_Unique_Names.py)
- **Test Error:** Testing stopped due to inability to register a new user account caused by failed security validations during sign-up. This blocks the creation of a new RAG store and validation of metadata. Please fix the registration issue to proceed with testing.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35Nli9RbdHjv75LcRlDQ5DYlgGr:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35Nli9RbdHjv75LcRlDQ5DYlgGr:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35Nli9RbdHjv75LcRlDQ5DYlgGr:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/5564d9fe-fd23-464d-8fc9-e65928a3a4d4
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006
- **Test Name:** RAG Store Creation - Duplicate Name Rejection
- **Test Code:** [TC006_RAG_Store_Creation___Duplicate_Name_Rejection.py](./TC006_RAG_Store_Creation___Duplicate_Name_Rejection.py)
- **Test Error:** Testing stopped due to sign-up failure caused by security validation errors. Unable to authenticate user and proceed with RAG store creation duplicate name validation test. Issue reported for resolution.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliP4nuv8ej7WVbZjXzvZdMh9:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliP4nuv8ej7WVbZjXzvZdMh9:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliP4nuv8ej7WVbZjXzvZdMh9:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/f2bde301-8a99-4657-b2f0-976a187ed5eb
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007
- **Test Name:** Embedding Generation via Google Gemini API
- **Test Code:** [TC007_Embedding_Generation_via_Google_Gemini_API.py](./TC007_Embedding_Generation_via_Google_Gemini_API.py)
- **Test Error:** Testing stopped due to inability to create or sign in to an account because of security validation errors during sign-up. Cannot proceed with uploading documents or testing Gemini API integration for semantic embeddings. Please resolve authentication issues first.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliPyqgVCH3Xq8yLnFraPSQFx:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliPyqgVCH3Xq8yLnFraPSQFx:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliPyqgVCH3Xq8yLnFraPSQFx:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/c40d0804-a450-4f39-a7df-bfd193664448
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008
- **Test Name:** Chat Interface - Real-Time Response Rendering with Markdown
- **Test Code:** [TC008_Chat_Interface___Real_Time_Response_Rendering_with_Markdown.py](./TC008_Chat_Interface___Real_Time_Response_Rendering_with_Markdown.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/c204998b-1050-4feb-865d-efef0f9cf651
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009
- **Test Name:** Chat History Persistence with Pagination and User Scoped Isolation
- **Test Code:** [TC009_Chat_History_Persistence_with_Pagination_and_User_Scoped_Isolation.py](./TC009_Chat_History_Persistence_with_Pagination_and_User_Scoped_Isolation.py)
- **Test Error:** The task to validate chat messages and AI responses persistence, pagination, and access control could not be fully completed. Multiple attempts to sign in with various emails failed with 'Couldn't find your account.' errors. Attempts to register new users failed due to security validation errors. Without successful authentication, it was not possible to participate in chats, generate message-response pairs, reload chat history, verify pagination, or test access control for other users. The system correctly prevents access to chat history for unrecognized users. Further testing requires a valid user account or resolution of registration issues.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliiU9nWKw46aPHAcGlfnyIrt:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliiU9nWKw46aPHAcGlfnyIrt:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliiU9nWKw46aPHAcGlfnyIrt:0:0)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliiU9nWKw46aPHAcGlfnyIrt:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliiU9nWKw46aPHAcGlfnyIrt:0:0)
[ERROR] Error deleting RAG store on unload: Error: exception TypeError: Failed to fetch sending request
    at http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:9686:13
    at async FileSearchStores.delete (http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:13186:7)
    at async Module.deleteRagStore (http://localhost:5177/services/geminiService.ts:106:3) (at http://localhost:5177/components/AuthenticatedApp.tsx:142:27)
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliiU9nWKw46aPHAcGlfnyIrt:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliiU9nWKw46aPHAcGlfnyIrt:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/15f3678b-e477-4dce-a615-733638fa6f3d
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010
- **Test Name:** API Endpoint Validation and Error Handling
- **Test Code:** [TC010_API_Endpoint_Validation_and_Error_Handling.py](./TC010_API_Endpoint_Validation_and_Error_Handling.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/67632ac6-3675-4c5d-85f2-f0eef078cd14
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011
- **Test Name:** Frontend Upload Progress and UI Feedback
- **Test Code:** [TC011_Frontend_Upload_Progress_and_UI_Feedback.py](./TC011_Frontend_Upload_Progress_and_UI_Feedback.py)
- **Test Error:** Testing stopped due to inability to create an account because of failed security validations. Cannot proceed to upload documents or verify progress indicators and error states. Issue reported.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliHOy8a4M8D2gkcwZHxYGPyW:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliHOy8a4M8D2gkcwZHxYGPyW:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliHOy8a4M8D2gkcwZHxYGPyW:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/4e4ef0de-6ac5-4ef4-af98-c8086895b3e2
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012
- **Test Name:** Session Management - Resume Previous Sessions and Unauthorized User Handling
- **Test Code:** [TC012_Session_Management___Resume_Previous_Sessions_and_Unauthorized_User_Handling.py](./TC012_Session_Management___Resume_Previous_Sessions_and_Unauthorized_User_Handling.py)
- **Test Error:** Testing stopped due to inability to create or use an authenticated account. The sign-up process fails with security validation errors, preventing further testing of authenticated user chat session resumption and RAG store loading. Please resolve the sign-up issue to enable full testing.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliR2VnHZQU31yiFQzMvNWHpI:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliR2VnHZQU31yiFQzMvNWHpI:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliR2VnHZQU31yiFQzMvNWHpI:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/7cb27cd3-3372-4a80-910b-e5c3121781db
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013
- **Test Name:** Health Check Endpoint Verification
- **Test Code:** [TC013_Health_Check_Endpoint_Verification.py](./TC013_Health_Check_Endpoint_Verification.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/aebd0e4c-d0e5-4926-9df7-a4561d90ae5e
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014
- **Test Name:** API CORS Policy Enforcement
- **Test Code:** [TC014_API_CORS_Policy_Enforcement.py](./TC014_API_CORS_Policy_Enforcement.py)
- **Test Error:** Testing of backend API CORS policies completed. Disallowed origin requests are correctly blocked with CORS headers. Allowed origin requests could not be fully verified due to inability to create or authenticate a test account because of security validation failures during sign-up. Please resolve account creation issues to enable full CORS testing.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliVGpZt9oI2Zkz865CNAgfbO:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliVGpZt9oI2Zkz865CNAgfbO:0:0)
[ERROR] Error deleting RAG store on unload: Error: exception TypeError: Failed to fetch sending request
    at http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:9686:13
    at async FileSearchStores.delete (http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:13186:7)
    at async Module.deleteRagStore (http://localhost:5177/services/geminiService.ts:106:3) (at http://localhost:5177/components/AuthenticatedApp.tsx:142:27)
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliVGpZt9oI2Zkz865CNAgfbO:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 403 () (at https://generativelanguage.googleapis.com/v1beta/fileSearchStores/chatsession1762790586471-97l7hwrssn3c?force=true:0:0)
[ERROR] Error deleting RAG store on unload: ApiError: {"error":{"code":403,"message":"You do not have permission to access the rag store chatsession1762790586471-97l7hwrssn3c or it may not exist.","status":"PERMISSION_DENIED"}}
    at throwErrorIfNotOK (http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:9848:24)
    at async http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:9599:7
    at async FileSearchStores.delete (http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:13186:7)
    at async Module.deleteRagStore (http://localhost:5177/services/geminiService.ts:106:3) (at http://localhost:5177/components/AuthenticatedApp.tsx:142:27)
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/6024d499-515c-4fb1-bd4f-9d5d28caafb6
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015
- **Test Name:** RAG Store Management - Update and Delete
- **Test Code:** [TC015_RAG_Store_Management___Update_and_Delete.py](./TC015_RAG_Store_Management___Update_and_Delete.py)
- **Test Error:** Unable to proceed with the task as no valid user account exists to sign in and perform the required RAG store update and delete tests. All sign-in attempts failed with 'Couldn't find your account.' error, and sign-up attempts failed due to security validations. Please provide valid credentials or a test account to continue.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliQ0lsWnmhVcDj8ogxAwnOlj:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliQ0lsWnmhVcDj8ogxAwnOlj:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliQ0lsWnmhVcDj8ogxAwnOlj:0:0)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NliQ0lsWnmhVcDj8ogxAwnOlj:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/9ab6d781-9aaf-49c6-ac6a-48e6259f48a8
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016
- **Test Name:** Chat CRUD Operations with User Scoping
- **Test Code:** [TC016_Chat_CRUD_Operations_with_User_Scoping.py](./TC016_Chat_CRUD_Operations_with_User_Scoping.py)
- **Test Error:** Testing stopped due to repeated user registration failures caused by security validation errors. Unable to authenticate a user to proceed with saving, retrieving, and deleting chat messages scoped to the authenticated user. Please resolve the registration issue to continue testing.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NlikjRMHFra3b3YDiLLI7aqDt:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NlikjRMHFra3b3YDiLLI7aqDt:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NlikjRMHFra3b3YDiLLI7aqDt:0:0)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ins?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NlikjRMHFra3b3YDiLLI7aqDt:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/client/sign_ups?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&__clerk_db_jwt=dvb_35NlikjRMHFra3b3YDiLLI7aqDt:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/1255c72d-0cfa-44b2-9a27-3bf11a95db9c
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017
- **Test Name:** Frontend Responsive Design and Accessibility
- **Test Code:** [TC017_Frontend_Responsive_Design_and_Accessibility.py](./TC017_Frontend_Responsive_Design_and_Accessibility.py)
- **Test Error:** The user interface on the desktop viewport has been verified successfully, including the chat interface, sign in modal, and keyboard navigation with proper focus handling. However, testing on mobile and tablet screen sizes and drag-and-drop upload functionality across devices was not performed. Therefore, the task is partially complete with success set to false due to incomplete coverage of all requested screen sizes and accessibility features.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliNPO9hpY5z7cTK5trLTNc7I:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Error deleting RAG store on unload: Error: exception TypeError: Failed to fetch sending request
    at http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:9686:13
    at async FileSearchStores.delete (http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:13186:7)
    at async Module.deleteRagStore (http://localhost:5177/services/geminiService.ts:106:3) (at http://localhost:5177/components/AuthenticatedApp.tsx:142:27)
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliNPO9hpY5z7cTK5trLTNc7I:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 403 () (at https://generativelanguage.googleapis.com/v1beta/fileSearchStores/chatsession1762790586471-97l7hwrssn3c?force=true:0:0)
[ERROR] Error deleting RAG store on unload: ApiError: {"error":{"code":403,"message":"You do not have permission to access the rag store chatsession1762790586471-97l7hwrssn3c or it may not exist.","status":"PERMISSION_DENIED"}}
    at throwErrorIfNotOK (http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:9848:24)
    at async http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:9599:7
    at async FileSearchStores.delete (http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:13186:7)
    at async Module.deleteRagStore (http://localhost:5177/services/geminiService.ts:106:3) (at http://localhost:5177/components/AuthenticatedApp.tsx:142:27)
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NliNPO9hpY5z7cTK5trLTNc7I:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/69ccc5aa-dc99-4aec-8bbe-298c7dd00522
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018
- **Test Name:** AI Generated Example Questions Rotation
- **Test Code:** [TC018_AI_Generated_Example_Questions_Rotation.py](./TC018_AI_Generated_Example_Questions_Rotation.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/b49125d7-a207-4123-aa40-a939de905f9a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019
- **Test Name:** Source Modal Interaction and Display
- **Test Code:** [TC019_Source_Modal_Interaction_and_Display.py](./TC019_Source_Modal_Interaction_and_Display.py)
- **Test Error:** The task to verify source modals opening on clicking citations and displaying correct document text chunks could not be completed due to an application error. The error message indicated a resource or permission issue preventing the generation of chat responses with citations. Consequently, no source modals appeared to test. The issue has been reported. Please resolve the application error and retry the test to verify the source modal functionality. Task stopped as instructed.
Browser Console Logs:
[WARNING] cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation (at https://cdn.tailwindcss.com/:63:1710)
[WARNING] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (at https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js:18:6277)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://engaged-moose-16.clerk.accounts.dev/v1/environment?__clerk_api_version=2025-11-10&_clerk_js_version=5.107.0&_method=PATCH&__clerk_db_jwt=dvb_35NlizobYVafcB8FveKc69xJNzk:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/chats?ragStoreName=fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] Failed to load chat history: Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async loadChatHistory (http://localhost:5177/components/AuthenticatedApp.tsx:183:24)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:94:29) (at http://localhost:5177/components/AuthenticatedApp.tsx:190:14)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:3001/api/ragstores/fileSearchStores%2Fchatsession1762790586471-97l7hwrssn3c:0:0)
[WARNING] RAG store not found in database (may exist in Gemini File Search): Error: HTTP 401: <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <style>
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: black;
                }
            }
        </style>
    </head>
    <body>
        <script>
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite:  false ,
                        signInUrl: "",
                        isInterstitial: true,
                    });
                    if(Clerk.loaded){
                        if(window.location.href.indexOf('#') === -1){
                            window.location.href = window.location.href;
                        } else if (window.navigator.userAgent.toLowerCase().includes('firefox/')){
                            formRedirect();
                        } else {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                script.setAttribute('data-clerk-publishable-key', 'pk_test_ZW5nYWdlZC1tb29zZS0xNi5jbGVyay5hY2NvdW50cy5kZXYk');
                script.async = true;
                script.src = "https://engaged-moose-16.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
</html>

    at ApiService.handleResponse (http://localhost:5177/src/services/apiService.ts:37:13)
    at async connectToDefaultStore (http://localhost:5177/components/AuthenticatedApp.tsx:97:40) (at http://localhost:5177/components/AuthenticatedApp.tsx:103:22)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent:0:0)
[ERROR] Failed to get response ApiError: {"error":{"code":400,"message":"Either this resource does not exist or it does not support permission management.","status":"INVALID_ARGUMENT"}}
    at throwErrorIfNotOK (http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:9848:24)
    at async http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:9599:7
    at async Models.generateContent (http://localhost:5177/node_modules/.vite/deps/@google_genai.js?v=977aa066:10672:16)
    at async Module.fileSearch (http://localhost:5177/services/geminiService.ts:38:20)
    at async handleSendMessage (http://localhost:5177/components/AuthenticatedApp.tsx:362:22) (at http://localhost:5177/components/AuthenticatedApp.tsx:152:12)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/43a55cc8-2832-4042-a02d-bd343b067e49/902a5b76-ecd0-4a92-8b07-882b344a7346
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **26.32** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---