import requests
import uuid

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

# Authentication token placeholder: set this to a valid token if required by the API
AUTH_HEADERS = {
    # Example: 'Authorization': 'Bearer <token>',
    # If Clerk or fallback admin token required, set here
}

def test_delete_api_ragstores_delete_rag_store_and_chats():
    ragstore_name = f"teststore-{uuid.uuid4()}"
    ragstore_display_name = "Test Store Display Name"
    created_ragstore = None

    # Create a RAG store first to delete later
    try:
        create_payload = {
            "name": ragstore_name,
            "displayName": ragstore_display_name
        }
        create_resp = requests.post(
            f"{BASE_URL}/api/ragstores",
            json=create_payload,
            headers=AUTH_HEADERS,
            timeout=TIMEOUT
        )
        assert create_resp.status_code == 201, f"RAG store creation failed: {create_resp.text}"
        created_ragstore = create_resp.json()
        assert created_ragstore["name"] == ragstore_name
        assert created_ragstore["displayName"] == ragstore_display_name

        # Optionally, create a chat for this ragstore to ensure associated chats deleted
        chat_payload = {
            "message": "Test message",
            "response": "Test response",
            "rag_store_name": ragstore_name
        }
        chat_resp = requests.post(
            f"{BASE_URL}/api/chats",
            json=chat_payload,
            headers=AUTH_HEADERS,
            timeout=TIMEOUT
        )
        assert chat_resp.status_code == 201, f"Chat creation failed: {chat_resp.text}"
        chat_created = chat_resp.json()
        chat_id = chat_created.get("id")
        assert chat_id is not None

        # Now delete the rag store
        delete_resp = requests.delete(
            f"{BASE_URL}/api/ragstores/{ragstore_name}",
            headers=AUTH_HEADERS,
            timeout=TIMEOUT
        )
        assert delete_resp.status_code == 200 or delete_resp.status_code == 204, f"Delete ragstore failed: {delete_resp.text}"

        # Verify rag store no longer exists (expect 404)
        get_ragstore_resp = requests.get(
            f"{BASE_URL}/api/ragstores/{ragstore_name}",
            headers=AUTH_HEADERS,
            timeout=TIMEOUT
        )
        assert get_ragstore_resp.status_code == 404, "RAG store was not deleted properly."

        # Verify chats associated with ragstore are deleted by trying to get chat by id (if API permits get by id)
        # Since no GET by id endpoint provided, verify by listing chats filtered by rag_store_name
        chats_resp = requests.get(
            f"{BASE_URL}/api/chats",
            headers=AUTH_HEADERS,
            timeout=TIMEOUT
        )
        assert chats_resp.status_code == 200, "Failed to get chats after ragstore deletion."
        chats_list = chats_resp.json()
        assert isinstance(chats_list, list)
        # Ensure no chat references that rag_store_name
        for chat in chats_list:
            assert chat.get("rag_store_name") != ragstore_name, "Chat associated with deleted ragstore still exists."

    finally:
        # Cleanup: If ragstore still exists, delete it
        if created_ragstore:
            requests.delete(
                f"{BASE_URL}/api/ragstores/{ragstore_name}",
                headers=AUTH_HEADERS,
                timeout=TIMEOUT
            )
        # Cannot delete chat individually here because chat deletion endpoint requires chat id and cleanup was done by ragstore deletion.


test_delete_api_ragstores_delete_rag_store_and_chats()
