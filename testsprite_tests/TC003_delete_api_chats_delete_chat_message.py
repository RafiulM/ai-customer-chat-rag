import requests

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

# Placeholder for auth token - replace with a valid token before testing
AUTH_TOKEN = "your_auth_token_here"

HEADERS = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}


def test_delete_api_chats_delete_chat_message():
    # Create a chat message to delete
    chat_payload = {
        "message": "Test message to be deleted",
        "response": "Test AI response",
    }

    # Create chat message
    chat_id = None
    try:
        create_resp = requests.post(
            f"{BASE_URL}/api/chats",
            json=chat_payload,
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        assert create_resp.status_code == 201 or create_resp.status_code == 200, \
            f"Chat creation failed with status {create_resp.status_code}: {create_resp.text}"
        create_data = create_resp.json()
        # Assuming response contains the created chat message with id field
        chat_id = create_data.get("id")
        assert chat_id is not None, "Created chat message id not found"

        # Delete the chat message
        delete_resp = requests.delete(
            f"{BASE_URL}/api/chats/{chat_id}",
            headers=HEADERS,
            timeout=TIMEOUT,
        )

        # Validate successful deletion response
        assert delete_resp.status_code == 200 or delete_resp.status_code == 204, \
            f"Chat deletion failed with status {delete_resp.status_code}: {delete_resp.text}"

        # Verify the chat message no longer exists by attempting to delete again or get
        delete_again_resp = requests.delete(
            f"{BASE_URL}/api/chats/{chat_id}",
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        assert delete_again_resp.status_code == 404, \
            f"Expected 404 deleting already deleted chat, got {delete_again_resp.status_code}"

    finally:
        # Cleanup: ensure chat message is deleted if it still exists
        if chat_id is not None:
            requests.delete(
                f"{BASE_URL}/api/chats/{chat_id}",
                headers=HEADERS,
                timeout=TIMEOUT,
            )


test_delete_api_chats_delete_chat_message()