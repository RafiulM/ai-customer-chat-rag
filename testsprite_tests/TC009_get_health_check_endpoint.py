import requests

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

def test_get_health_check_endpoint():
    url = f"{BASE_URL}/health"
    headers = {
        "Accept": "application/json"
    }
    try:
        response = requests.get(url, headers=headers, timeout=TIMEOUT)
        response.raise_for_status()
    except requests.RequestException as e:
        assert False, f"Request to /health failed: {e}"

    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
    try:
        data = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    # Expecting some form of health status in the response
    # Common conventions: {"status":"ok"} or {"healthy": true}
    # Since not explicitly specified, check for 'status' key with 'ok' or 'healthy' key true
    if "status" in data:
        assert data["status"].lower() == "ok", f"Health status expected to be 'ok', got {data['status']}"
    elif "healthy" in data:
        assert data["healthy"] is True, f"Health status expected to be True, got {data['healthy']}"
    else:
        # fallback: response body not empty or some indication
        assert data, "Health check response JSON is empty or missing expected keys"

test_get_health_check_endpoint()