import requests
import uuid

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

# Dummy authentication token for testing (replace with valid token if needed)
AUTH_TOKEN = "Bearer test-auth-token"

HEADERS = {
    "Authorization": AUTH_TOKEN,
    "Content-Type": "application/json"
}

def test_get_specific_ragstore_with_chat_count():
    # Create a unique RAG store name for testing
    unique_name = f"test-ragstore-{uuid.uuid4().hex[:8]}"
    ragstore_payload = {
        "name": unique_name,
        "displayName": "Test RAG Store",
        "metadata": {
            "example_questions": ["What is the test store?"]
        }
    }

    ragstore_url = f"{BASE_URL}/api/ragstores"
    ragstore_get_url = f"{BASE_URL}/api/ragstores/{unique_name}"
    ragstore_delete_url = f"{BASE_URL}/api/ragstores/{unique_name}"

    try:
        # Create a new RAG store to test retrieval
        create_resp = requests.post(
            ragstore_url,
            json=ragstore_payload,
            headers=HEADERS,
            timeout=TIMEOUT
        )
        assert create_resp.status_code == 201 or create_resp.status_code == 200, \
            f"Failed to create RAG store. Status: {create_resp.status_code}, Response: {create_resp.text}"

        # Retrieve the specific RAG store by name
        get_resp = requests.get(
            ragstore_get_url,
            headers=HEADERS,
            timeout=TIMEOUT
        )
        assert get_resp.status_code == 200, \
            f"Failed to get RAG store by name. Status: {get_resp.status_code}, Response: {get_resp.text}"

        data = get_resp.json()
        assert isinstance(data, dict), "Response is not a JSON object"
        # Validate keys expected: name, display_name, chat_count, document_count at least
        assert "name" in data and data["name"] == unique_name, "RAG store name mismatch"
        assert "display_name" in data and data["display_name"] == ragstore_payload["displayName"], "RAG store display_name mismatch"
        assert "chat_count" in data and isinstance(data["chat_count"], int), "'chat_count' missing or not int"
        assert "document_count" in data and isinstance(data["document_count"], int), "'document_count' missing or not int"

    finally:
        # Cleanup: delete the created RAG store
        try:
            del_resp = requests.delete(
                ragstore_delete_url,
                headers=HEADERS,
                timeout=TIMEOUT
            )
            # Possible 200 or 204 for successful deletion
            assert del_resp.status_code in (200, 204), \
                f"Failed to delete RAG store. Status: {del_resp.status_code}, Response: {del_resp.text}"
        except Exception as e:
            # If delete fails, print error but don't raise to not mask original test results
            print(f"Cleanup failed: could not delete ragstore {unique_name}: {e}")

test_get_specific_ragstore_with_chat_count()
