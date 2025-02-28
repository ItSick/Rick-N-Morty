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
  private readonly DEFAULT_TTL = 5 * 60 * 1000;

  constructor() {
    setInterval(() => this.cleanExpiredItems(), 60 * 1000); 
  }


  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
    console.log(`Cache: Set '${key}'`);
  }


  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      console.log(`Cache: Miss '${key}'`);
      return null;
    }
    
    if (Date.now() > item.expiry) {
      console.log(`Cache: Expired '${key}'`);
      this.cache.delete(key);
      return null;
    }
    
    console.log(`Cache: Hit '${key}'`);
    return item.data as T;
  }


  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    const isValid = Date.now() <= item.expiry;
    if (!isValid) {
      this.cache.delete(key);
    }
    
    return isValid;
  }


  remove(key: string): void {
    this.cache.delete(key);
    console.log(`Cache: Removed '${key}'`);
  }


  clear(): void {
    this.cache.clear();
    console.log('Cache: Cleared all items');
  }


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