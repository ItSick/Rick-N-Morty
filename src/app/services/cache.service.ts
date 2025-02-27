import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
}
import { Injectable } from '@angular/core';

interface CacheItem<T> {
  data: T;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor() {
    // Periodically clean expired items
    setInterval(() => this.cleanExpiredItems(), 60 * 1000); // every minute
  }

  /**
   * Set an item in the cache
   * @param key The cache key
   * @param data The data to cache
   * @param ttl Time to live in milliseconds (defaults to 5 minutes)
   */
  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
    console.log(`Cache: Set '${key}'`);
  }

  /**
   * Get an item from the cache
   * @param key The cache key
   * @returns The cached data or null if not found or expired
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    // Return null if item doesn't exist
    if (!item) {
      console.log(`Cache: Miss '${key}'`);
      return null;
    }
    
    // Return null if item is expired
    if (Date.now() > item.expiry) {
      console.log(`Cache: Expired '${key}'`);
      this.cache.delete(key);
      return null;
    }
    
    console.log(`Cache: Hit '${key}'`);
    return item.data as T;
  }

  /**
   * Check if a key exists in the cache and is not expired
   * @param key The cache key
   * @returns True if the key exists and is not expired
   */
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    const isValid = Date.now() <= item.expiry;
    if (!isValid) {
      this.cache.delete(key);
    }
    
    return isValid;
  }

  /**
   * Remove an item from the cache
   * @param key The cache key
   */
  remove(key: string): void {
    this.cache.delete(key);
    console.log(`Cache: Removed '${key}'`);
  }

  /**
   * Clear all items from the cache
   */
  clear(): void {
    this.cache.clear();
    console.log('Cache: Cleared all items');
  }

  /**
   * Remove all expired items from the cache
   */
  private cleanExpiredItems(): void {
    const now = Date.now();
    let expiredCount = 0;
    
    this.cache.forEach((item, key) => {
      if (now > item.expiry) {
        this.cache.delete(key);
        expiredCount++;
      }
    });
    
    if (expiredCount > 0) {
      console.log(`Cache: Cleaned ${expiredCount} expired items`);
    }
  }
}