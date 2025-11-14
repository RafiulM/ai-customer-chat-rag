import requests
import uuid

BASE_URL = "http://localhost:3001"
TIMEOUT = 30  # seconds

# Placeholder: Replace with a valid authentication token for a test user.
# The token should be a JWT or similar, obtained from Clerk authentication or fallback admin user's token.
AUTH_TOKEN = "REPLACE_WITH_VALID_AUTH_TOKEN"

HEADERS = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json",
}

def test_post_api_chats_save_chat_message():
    """
    Verify that the POST /api/chats endpoint correctly saves a chat message
    with user authentication, validates input data, and returns appropriate
    success or error responses.
    """
    url = f"{BASE_URL}/api/chats"

    # Define a valid chat message payload
    valid_message = {
        "message": "Hello AI, can you help me?",
        "response": "Sure! How can I assist you today?",
        "metadata": {
            "source": "test-case",
            "timestamp": "2025-11-12T10:00:00Z"
        }
        # "rag_store_name" is optional, not provided here
    }

    # 1) Test successful POST with valid data and authentication
    response = requests.post(url, json=valid_message, headers=HEADERS, timeout=TIMEOUT)
    assert response.status_code == 201, f"Expected 201 Created, got {response.status_code}"
    data = response.json()
    # Validate response body structure
    assert "id" in data and isinstance(data["id"], int), "Response missing valid 'id'"
    assert data["message"] == valid_message["message"], "Response message mismatch"
    assert data["response"] == valid_message["response"], "Response AI message mismatch"
    assert "user_id" in data and isinstance(data["user_id"], str) and data["user_id"], "Response missing 'user_id'"

    new_chat_id = data["id"]

    try:
        # 2) Test validation: missing required field 'message'
        invalid_payload = {
            "response": "This is a response without message field."
        }
        resp_invalid = requests.post(url, json=invalid_payload, headers=HEADERS, timeout=TIMEOUT)
        assert resp_invalid.status_code == 400, f"Expected 400 Bad Request for missing 'message', got {resp_invalid.status_code}"

        # 3) Test validation: empty message string
        invalid_payload2 = {
            "message": "",
            "response": "Response present"
        }
        resp_invalid2 = requests.post(url, json=invalid_payload2, headers=HEADERS, timeout=TIMEOUT)
        assert resp_invalid2.status_code == 400, f"Expected 400 Bad Request for empty 'message', got {resp_invalid2.status_code}"

        # 4) Test unauthorized request (no auth header)
        resp_unauth = requests.post(url, json=valid_message, headers={"Content-Type": "application/json"}, timeout=TIMEOUT)
        assert resp_unauth.status_code in (401, 403), f"Expected 401 or 403 Unauthorized without auth, got {resp_unauth.status_code}"

        # 5) Test with invalid JSON (e.g. sending text instead of JSON)
        resp_badjson = requests.post(url, data="This is not JSON", headers=HEADERS, timeout=TIMEOUT)
        # Server may respond 400 or other error indicating bad request
        assert resp_badjson.status_code == 400 or resp_badjson.status_code == 422, f"Expected 400 or 422 Bad Request for invalid JSON, got {resp_badjson.status_code}"

    finally:
        # Cleanup: delete the created chat message to keep test isolated
        del_url = f"{BASE_URL}/api/chats/{new_chat_id}"
        del_resp = requests.delete(del_url, headers=HEADERS, timeout=TIMEOUT)
        # Accept 200 OK or 204 No Content as success for delete
        assert del_resp.status_code in (200, 204), f"Failed to delete chat message with id {new_chat_id}, got {del_resp.status_code}"

test_post_api_chats_save_chat_message()
