// 代码生成时间: 2025-10-16 20:08:29
import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity'; // Assuming the entity is named Notification and defined in notification.entity.ts

@Injectable()
export class MessageNotificationService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  /**
   * Send a notification message to a user.
   * @param userId The ID of the user to receive the notification.
   * @param message The content of the notification message.
   * @returns A promise that resolves to the created notification entity or rejects with an error.
   */
  async sendNotification(userId: string, message: string): Promise<Notification> {
    try {
      // Use the entityManager to create and save a new notification entity
      const notification = this.entityManager.create(Notification, { userId, message });
      return await this.entityManager.save(Notification, notification);
    } catch (error) {
      // Handle any errors that occur during the notification process
      throw new ApolloError('Failed to send notification', 'NOTIFICATION_SEND_ERROR', { cause: error });
    }
  }
}

/*
 * Note: This is a basic implementation and may require additional functionality,
 * such as user authentication, notification delivery mechanisms,
 * and a message queue for scaling. It also assumes the existence of a
 * Notification entity with fields for userId and message.
 * Further development would include fleshing out these aspects.
 */