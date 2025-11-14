import requests
import os

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

# Provide a valid authentication token for the user, e.g. from environment or a fixture
AUTH_TOKEN = os.getenv("TEST_AUTH_TOKEN")
HEADERS = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def test_get_api_chats_retrieve_chat_history():
    # First, create a RAG store for user-scoping chat messages
    ragstore_payload = {
        "name": "teststore-for-chat-history",
        "displayName": "Test Store For Chat History",
        "metadata": {"example_questions": ["What is AI?", "Tell me about RAG."]}
    }
    ragstore = None
    created_chats = []
    try:
        create_ragstore_resp = requests.post(
            f"{BASE_URL}/api/ragstores",
            headers=HEADERS,
            json=ragstore_payload,
            timeout=TIMEOUT
        )
        assert create_ragstore_resp.status_code == 201, f"Failed to create rag store: {create_ragstore_resp.text}"
        ragstore = create_ragstore_resp.json()
        rag_store_name = ragstore["name"]
        # Create multiple chat messages linked to the created RAG store
        chat_messages = [
            {
                "message": "Hello AI",
                "response": "Hello! How can I assist you?",
                "rag_store_name": rag_store_name,
                "metadata": {"source": "test"}
            },
            {
                "message": "What is RAG?",
                "response": "RAG stands for Retrieval-Augmented Generation.",
                "rag_store_name": rag_store_name,
                "metadata": {"source": "test"}
            },
            {
                "message": "Tell me a joke",
                "response": "Why did the AI cross the road?",
                "rag_store_name": rag_store_name,
                "metadata": {"source": "test"}
            }
        ]
        for chat in chat_messages:
            resp = requests.post(
                f"{BASE_URL}/api/chats",
                headers=HEADERS,
                json=chat,
                timeout=TIMEOUT
            )
            assert resp.status_code == 201, f"Failed to create chat message: {resp.text}"
            created_chats.append(resp.json())
        
        # Test GET /api/chats with pagination params (limit=2, page=1)
        params = {
            "limit": 2,
            "page": 1,
            "rag_store_name": rag_store_name
        }
        get_resp = requests.get(
            f"{BASE_URL}/api/chats",
            headers=HEADERS,
            params=params,
            timeout=TIMEOUT
        )
        assert get_resp.status_code == 200, f"Failed to get chat history: {get_resp.text}"
        data = get_resp.json()
        
        # Validate response structure and content
        assert "chats" in data, "Response missing 'chats' key"
        assert isinstance(data["chats"], list), "'chats' should be a list"
        assert len(data["chats"]) <= 2, "Pagination limit exceeded"
        
        # Check each returned chat belongs to the authenticated user and requested RAG store
        for chat in data["chats"]:
            assert "id" in chat and isinstance(chat["id"], int), "Chat id missing or invalid"
            assert "user_id" in chat and isinstance(chat["user_id"], str) and chat["user_id"], "Chat user_id missing or invalid"
            assert "message" in chat and isinstance(chat["message"], str), "Chat message missing or invalid"
            assert "response" in chat and isinstance(chat["response"], str), "Chat response missing or invalid"
            # Check rag_store_name association matches filter
            assert chat.get("rag_store_name") == rag_store_name or chat.get("rag_store_name") is None, "Chat rag_store_name mismatch"
            # Metadata should be json/dict or null
            if "metadata" in chat and chat["metadata"] is not None:
                assert isinstance(chat["metadata"], dict), "Chat metadata should be a dict if present"
        
        # There should be pagination metadata (like total count, page info) if implemented
        # Accept optional keys for pagination metadata
        assert any(k in data for k in ("total", "page", "limit")), "Response missing pagination metadata keys"
        
        # Validate data isolation - chats should only belong to this user
        # If user_id is known from the token, can assert equality
        # Without user_id info from token, just ensure user_id is present
        
    finally:
        # Cleanup: delete created chats then ragstore
        for chat in created_chats:
            try:
                del_resp = requests.delete(
                    f"{BASE_URL}/api/chats/{chat['id']}",
                    headers=HEADERS,
                    timeout=TIMEOUT
                )
                # Accept 200 or 204 as success or 404 if already deleted
                assert del_resp.status_code in (200, 204, 404)
            except Exception:
                pass
        if ragstore is not None:
            try:
                del_resp = requests.delete(
                    f"{BASE_URL}/api/ragstores/{ragstore['name']}",
                    headers=HEADERS,
                    timeout=TIMEOUT
                )
                assert del_resp.status_code in (200, 204, 404)
            except Exception:
                pass

test_get_api_chats_retrieve_chat_history()