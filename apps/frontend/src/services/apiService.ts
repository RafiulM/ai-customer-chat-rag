/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useAuth } from "@clerk/clerk-react";

// API service for making authenticated requests to the backend
export class ApiService {
  private baseUrl: string;
  private getToken: () => Promise<string | null>;

  constructor(baseUrl: string, getToken: () => Promise<string | null>) {
    this.baseUrl = baseUrl;
    this.getToken = getToken;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    try {
      // Get the session token from Clerk (optional - don't fail if not available)
      const token = await this.getToken();
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      // If no token, proceed without Authorization header (backend will use admin_user_id)

      return headers;
    } catch (error) {
      // If getToken fails (e.g., user not signed in), proceed without auth
      // Backend will use admin_user_id from environment
      return {
        "Content-Type": "application/json",
      };
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;

      try {
        const errorData = JSON.parse(errorText);
        errorMessage =
          errorData.error || errorData.message || `HTTP ${response.status}`;
      } catch {
        errorMessage = `HTTP ${response.status}: ${errorText}`;
      }

      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Chat API methods
  async saveChat(data: {
    message: string;
    response: string;
    ragStoreName?: string;
    metadata?: any;
  }) {
    const response = await fetch(`${this.baseUrl}/api/chats`, {
      method: "POST",
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async getChats(
    options: {
      ragStoreName?: string;
      limit?: number;
      offset?: number;
    } = {}
  ) {
    const params = new URLSearchParams();

    if (options.ragStoreName) {
      params.append("ragStoreName", options.ragStoreName);
    }
    if (options.limit) {
      params.append("limit", options.limit.toString());
    }
    if (options.offset) {
      params.append("offset", options.offset.toString());
    }

    const response = await fetch(`${this.baseUrl}/api/chats?${params}`, {
      method: "GET",
      headers: await this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async deleteChat(chatId: number) {
    const response = await fetch(`${this.baseUrl}/api/chats/${chatId}`, {
      method: "DELETE",
      headers: await this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // RAG Store API methods
  async createRagStore(data: {
    name: string;
    displayName: string;
    metadata?: any;
  }) {
    const response = await fetch(`${this.baseUrl}/api/ragstores`, {
      method: "POST",
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async getRagStores() {
    const response = await fetch(`${this.baseUrl}/api/ragstores`, {
      method: "GET",
      headers: await this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getRagStore(name: string) {
    const response = await fetch(
      `${this.baseUrl}/api/ragstores/${encodeURIComponent(name)}`,
      {
        method: "GET",
        headers: await this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  async updateRagStore(
    name: string,
    data: {
      displayName?: string;
      metadata?: any;
      documentCount?: number;
    }
  ) {
    const response = await fetch(
      `${this.baseUrl}/api/ragstores/${encodeURIComponent(name)}`,
      {
        method: "PUT",
        headers: await this.getAuthHeaders(),
        body: JSON.stringify(data),
      }
    );

    return this.handleResponse(response);
  }

  async deleteRagStore(name: string) {
    const response = await fetch(
      `${this.baseUrl}/api/ragstores/${encodeURIComponent(name)}`,
      {
        method: "DELETE",
        headers: await this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }
}

// Hook to use API service with Clerk authentication
export const useApiService = () => {
  const { getToken } = useAuth();
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  // Wrap getToken to ensure we get a valid session token (optional)
  const getTokenWrapper = async () => {
    try {
      // Get the session token - Clerk's getToken() returns a JWT session token by default
      // If user is not signed in, this will return null, which is fine
      const token = await getToken();
      return token;
    } catch (error) {
      // User is not signed in, return null - backend will use admin_user_id
      return null;
    }
  };

  const apiService = new ApiService(baseUrl, getTokenWrapper);
  return apiService;
};

// Types for API responses
export interface ChatResponse {
  message: string;
  chat: {
    id: number;
    userId: string;
    message: string;
    response: string;
    metadata?: any;
    ragStoreName?: string;
    createdAt: string;
  };
}

export interface ChatsListResponse {
  chats: Array<{
    id: number;
    userId: string;
    message: string;
    response: string;
    metadata?: any;
    ragStoreName?: string;
    createdAt: string;
  }>;
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

export interface RagStoreResponse {
  message: string;
  ragStore: {
    id: number;
    userId: string;
    name: string;
    displayName: string;
    documentCount: number;
    metadata?: any;
    createdAt: string;
    updatedAt: string;
  };
}

export interface RagStoresListResponse {
  ragStores: Array<{
    id: number;
    userId: string;
    name: string;
    displayName: string;
    documentCount: number;
    metadata?: any;
    createdAt: string;
    updatedAt: string;
  }>;
}

export interface RagStoreDetailResponse {
  ragStore: {
    id: number;
    userId: string;
    name: string;
    displayName: string;
    documentCount: number;
    metadata?: any;
    createdAt: string;
    updatedAt: string;
  };
  chatCount: number;
}
