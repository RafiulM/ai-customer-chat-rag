#!/usr/bin/env node

/**
 * Script to fetch RAG stores from Gemini API
 * Usage: node fetch-rag-stores.js
 * 
 * Make sure to set GEMINI_API_KEY environment variable or pass it as argument:
 * GEMINI_API_KEY=your_key node fetch-rag-stores.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try to load API key from environment variable first
let GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

// If not in env, try to read from .env.local file
if (!GEMINI_API_KEY) {
  try {
    const envPath = join(__dirname, 'apps/frontend/.env.local');
    const envFile = readFileSync(envPath, 'utf-8');
    const match = envFile.match(/GEMINI_API_KEY=(.+)/);
    if (match) {
      GEMINI_API_KEY = match[1].trim();
    }
  } catch (error) {
    // File doesn't exist or can't be read, that's okay
  }
}

if (!GEMINI_API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY not found in environment variables');
  console.error('   Please set GEMINI_API_KEY in apps/frontend/.env.local');
  process.exit(1);
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/fileSearchStores';

async function fetchRagStores() {
  try {
    console.log('🔍 Fetching RAG stores from Gemini API...\n');
    console.log(`📍 Endpoint: ${GEMINI_API_URL}`);
    console.log(`🔑 API Key: ${GEMINI_API_KEY.substring(0, 10)}...\n`);

    const response = await fetch(`${GEMINI_API_URL}?pageSize=50`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error: ${response.status} ${response.statusText}`);
      console.error(`Response: ${errorText}`);
      process.exit(1);
    }

    const data = await response.json();
    
    console.log('✅ Successfully fetched RAG stores!\n');
    console.log('='.repeat(80));
    console.log('📦 RAG STORES RESPONSE');
    console.log('='.repeat(80));
    console.log(JSON.stringify(data, null, 2));
    console.log('='.repeat(80));
    
    if (data.fileSearchStores && data.fileSearchStores.length > 0) {
      console.log(`\n📊 Found ${data.fileSearchStores.length} RAG store(s):\n`);
      data.fileSearchStores.forEach((store, index) => {
        console.log(`${index + 1}. ${store.name || 'Unknown'}`);
        console.log(`   Display Name: ${store.displayName || 'N/A'}`);
        console.log(`   Created: ${store.createTime || 'N/A'}`);
        console.log(`   Updated: ${store.updateTime || 'N/A'}`);
        if (store.fileCount) {
          console.log(`   Files: ${store.fileCount}`);
        }
        console.log('');
      });
    } else {
      console.log('\n📭 No RAG stores found.');
    }

    if (data.nextPageToken) {
      console.log(`\n📄 Next page token: ${data.nextPageToken}`);
      console.log('   (Use this token to fetch more results)');
    }

  } catch (error) {
    console.error('❌ Error fetching RAG stores:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
    process.exit(1);
  }
}

fetchRagStores();

