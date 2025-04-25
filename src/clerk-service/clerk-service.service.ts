// src/clerk/clerk.service.ts
import { Injectable } from '@nestjs/common';
import { createClerkClient } from '@clerk/clerk-sdk-node';

@Injectable()
export class ClerkService {
  private clerkClient;

  constructor() {
    this.clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });
  }

  async setUserMetadata(userId: string, key: string, value: any) {
    try {
      const existingData = await this.clerkClient.users.getUser(userId);
      const res = await this.clerkClient.users.updateUser(userId, {
        publicMetadata: {
          ...existingData.publicMetadata,
          [key]: value,
        },
      });
      console.log('User metadata updated:', res);
      return res;
    } catch (error) {
      console.error('Error setting Clerk metadata:', error);
      throw error;
    }
  }
}
