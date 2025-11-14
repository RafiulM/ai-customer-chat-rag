import requests
import uuid

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

# Placeholder function to get auth headers
def get_auth_headers():
    # In a real scenario, replace with code that fetches a valid Clerk auth token
    # For this test, assuming a token is available as an environment variable or predefined
    # Return headers dict with Authorization: Bearer <token>
    token = "mocked_valid_bearer_token_to_replace_with_real_token"
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

def test_post_api_ragstores_create_rag_store():
    ragstore_name = f"test-ragstore-{uuid.uuid4().hex[:8]}".lower()
    display_name = f"Test RAG Store {uuid.uuid4().hex[:8]}"
    metadata = {
        "files": ["doc1.pdf", "doc2.txt"],
        "example_questions": ["What is AI?", "How do embeddings work?"]
    }

    auth_headers = get_auth_headers()
    store_payload = {
        "name": ragstore_name,
        "display_name": display_name,
        "metadata": metadata
    }

    created_ragstore = None

    try:
        # 1. Test creating a new RAG store successfully
        response = requests.post(
            f"{BASE_URL}/api/ragstores",
            headers=auth_headers,
            json=store_payload,
            timeout=TIMEOUT
        )
        assert response.status_code == 201, f"Expected 201 Created, got {response.status_code}"
        created_ragstore = response.json()

        # Validate returned data accuracy
        assert created_ragstore.get("name") == ragstore_name
        assert created_ragstore.get("display_name") == display_name
        # Metadata stored accurately (may be partial or full, depending on implementation)
        returned_metadata = created_ragstore.get("metadata", {})
        for key in metadata:
            assert key in returned_metadata, f"Metadata key '{key}' missing in response"
            assert returned_metadata[key] == metadata[key], f"Metadata '{key}' mismatch"

        # 2. Test unique name validation: attempt to create another store with same name
        dup_response = requests.post(
            f"{BASE_URL}/api/ragstores",
            headers=auth_headers,
            json=store_payload,
            timeout=TIMEOUT
        )
        assert dup_response.status_code in (400, 409), (
            f"Expected 400 or 409 for duplicate name, got {dup_response.status_code}"
        )
        dup_error = dup_response.json()
        assert "unique" in dup_error.get("message", "").lower() or "duplicate" in dup_error.get("message", "").lower()

        # 3. Test authentication enforcement: try to create without auth header
        no_auth_response = requests.post(
            f"{BASE_URL}/api/ragstores",
            headers={"Content-Type": "application/json"},
            json={
                "name": f"{ragstore_name}-noauth",
                "display_name": "No Auth Test",
                "metadata": {}
            },
            timeout=TIMEOUT
        )
        # Could be 401 Unauthorized or 403 Forbidden depending on backend auth config
        assert no_auth_response.status_code in (401, 403), (
            f"Expected 401 or 403 for missing auth, got {no_auth_response.status_code}"
        )

    finally:
        # Cleanup: delete ragstore if created
        if created_ragstore and "name" in created_ragstore:
            try:
                del_response = requests.delete(
                    f"{BASE_URL}/api/ragstores/{created_ragstore['name']}",
                    headers=auth_headers,
                    timeout=TIMEOUT
                )
                # Deletion can be 200 or 204 on success; allow also 404 if already deleted
                assert del_response.status_code in (200, 204, 404)
            except Exception:
                pass

test_post_api_ragstores_create_rag_store()
