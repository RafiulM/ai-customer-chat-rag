import requests
import uuid

BASE_URL = "http://localhost:3001"
TIMEOUT = 30
HEADERS = {
    "Content-Type": "application/json",
    # Include authentication headers here if needed
    # e.g. "Authorization": "Bearer <token>"
}

def test_put_api_ragstores_update_rag_store():
    # Create a new RAG store for testing update
    ragstore_name = f"test-ragstore-{uuid.uuid4().hex[:8]}"
    create_payload = {
        "name": ragstore_name,
        "displayName": "Original Display Name",
        "documentCount": 0,
        "metadata": {"files": [], "example_questions": []}
    }
    try:
        # Create RAG store
        create_resp = requests.post(
            f"{BASE_URL}/api/ragstores",
            json=create_payload,
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        assert create_resp.status_code == 201, f"Create failed: {create_resp.text}"
        created_data = create_resp.json()
        assert isinstance(created_data, dict)
        assert created_data.get("name") == ragstore_name

        # Update the RAG store's details
        update_payload = {
            "displayName": "Updated Display Name",
            "documentCount": 5,
            "metadata": {"files": ["doc1.pdf", "doc2.txt"], "example_questions": ["What is AI?", "How to use chat?"]}
        }
        update_resp = requests.put(
            f"{BASE_URL}/api/ragstores/{ragstore_name}",
            json=update_payload,
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        assert update_resp.status_code == 200, f"Update failed: {update_resp.text}"
        updated_data = update_resp.json()
        assert updated_data.get("name") == ragstore_name
        assert updated_data.get("displayName") == update_payload["displayName"]
        assert updated_data.get("documentCount") == update_payload["documentCount"]
        assert updated_data.get("metadata") == update_payload["metadata"]

        # Try an error scenario: update non-existent rag store
        non_exist_name = f"nonexistent-{uuid.uuid4().hex[:8]}"
        error_resp = requests.put(
            f"{BASE_URL}/api/ragstores/{non_exist_name}",
            json=update_payload,
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        assert error_resp.status_code in (404, 400), f"Expected not found or bad request, got {error_resp.status_code} {error_resp.text}"

        # Try an error scenario: update with invalid data (empty displayName)
        invalid_payload = {"displayName": ""}
        invalid_resp = requests.put(
            f"{BASE_URL}/api/ragstores/{ragstore_name}",
            json=invalid_payload,
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        assert invalid_resp.status_code in (400,), f"Expected validation error 400, got {invalid_resp.status_code} {invalid_resp.text}"

    finally:
        # Clean up: delete the created rag store
        del_resp = requests.delete(
            f"{BASE_URL}/api/ragstores/{ragstore_name}",
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        assert del_resp.status_code == 200 or del_resp.status_code == 204

test_put_api_ragstores_update_rag_store()
