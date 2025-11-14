import requests
import uuid

BASE_URL = "http://localhost:3001"
HEADERS = {
    # Assuming authentication token is required and available as an environment variable or fixed value for testing
    # Replace 'YourAuthTokenHere' with a valid token
    "Authorization": "Bearer YourAuthTokenHere",
    "Content-Type": "application/json"
}
TIMEOUT = 30

def test_get_api_ragstores_retrieve_user_rag_stores():
    # Create a new RAG store to ensure there is at least one RAG store to retrieve
    rag_store_name = f"test-ragstore-{uuid.uuid4()}"
    rag_store_display_name = "Test RAG Store Display Name"
    create_payload = {
        "name": rag_store_name,
        "displayName": rag_store_display_name
    }

    rag_store_created = False
    try:
        create_response = requests.post(
            f"{BASE_URL}/api/ragstores",
            headers=HEADERS,
            json=create_payload,
            timeout=TIMEOUT
        )
        assert create_response.status_code == 201, f"Failed to create RAG store: {create_response.text}"
        created_store = create_response.json()
        assert "name" in created_store and created_store["name"] == rag_store_name
        assert "display_name" in created_store and created_store["display_name"] == rag_store_display_name
        rag_store_created = True

        # Now retrieve the list of RAG stores for the authenticated user
        get_response = requests.get(
            f"{BASE_URL}/api/ragstores",
            headers=HEADERS,
            timeout=TIMEOUT
        )
        assert get_response.status_code == 200, f"Failed to retrieve RAG stores: {get_response.text}"
        rag_stores = get_response.json()
        assert isinstance(rag_stores, list), "RAG stores response is not a list"

        # Check that the created rag store is in the retrieved list
        matched_stores = [store for store in rag_stores if store.get("name") == rag_store_name]
        assert len(matched_stores) == 1, "Created RAG store not found in retrieved list"

        store = matched_stores[0]
        # Validate required keys and their types
        assert "id" in store and isinstance(store["id"], int), "RAG store id missing or not int"
        assert "user_id" in store and isinstance(store["user_id"], str), "RAG store user_id missing or not str"
        assert store["name"] == rag_store_name, "RAG store name mismatch"
        assert store["display_name"] == rag_store_display_name, "RAG store display_name mismatch"
        assert "document_count" in store and isinstance(store["document_count"], int), "document_count missing or not int"
        assert "created_at" in store, "created_at missing"
        assert "updated_at" in store, "updated_at missing"

        # Additional check: user scoped data isolation cannot be confirmed without multiple user contexts,
        # but presence of only authenticated user's resources is implied here.

    finally:
        # Cleanup: delete the created rag store to maintain test isolation
        if rag_store_created:
            del_response = requests.delete(
                f"{BASE_URL}/api/ragstores/{rag_store_name}",
                headers=HEADERS,
                timeout=TIMEOUT
            )
            # Accept 200 or 204 as successful delete status codes
            assert del_response.status_code in (200, 204), f"Failed to delete RAG store in cleanup: {del_response.text}"

test_get_api_ragstores_retrieve_user_rag_stores()
