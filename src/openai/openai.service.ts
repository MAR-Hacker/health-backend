import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  /**
   * Processes user symptoms and returns AI diagnosis with confidence
   */
  async processSymptoms(userId: string, userInput: string) {
    try {
      // Verify if the user exists
      const userExists = await this.prisma.user.findUnique({
        where: { userId }, // Use userId instead of id
      });

      if (!userExists) {
        throw new Error(`User with userId ${userId} does not exist.`);
      }

      // Call OpenAI API to analyze symptoms
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are a medical AI assistant that analyzes symptoms and provides possible diagnoses with confidence scores.',
          },
          {
            role: 'user',
            content: this.createPromptForSymptomAnalysis(userInput),
          },
        ],
        temperature: 0.3,
      });

      // Parse the AI response
      const aiResponse = response.choices[0]?.message?.content?.trim() || '';
      const { condition, confidence, recommendations, extractedSymptoms } =
        this.parseAiResponse(aiResponse);

      // Store the chat in the database
      const symptomChat = await this.prisma.symptomChat.create({
        data: {
          userId,
          userInput,
          aiResponse,
          confidence,
          possibleCondition: condition,
          recommendations,
        },
      });

      // Process and store extracted symptoms
      for (const symptomDesc of extractedSymptoms) {
        const symptom = await this.findOrCreateSymptom(symptomDesc);
        await this.prisma.symptomChatSymptom.create({
          data: {
            symptomId: symptom.id,
            symptomChatId: symptomChat.id,
          },
        });
      }

      return {
        id: symptomChat.id,
        userInput,
        aiResponse,
        confidence,
        possibleCondition: condition,
        recommendations,
        symptoms: extractedSymptoms,
        createdAt: symptomChat.createdAt,
      };
    } catch (error) {
      console.error('Error processing symptoms with OpenAI:', error);
      throw new Error('Failed to process symptoms');
    }
  }

  /**
   * Creates a prompt for symptom analysis
   */
  private createPromptForSymptomAnalysis(symptoms: string): string {
    return `
      Analyze the following symptoms and provide a possible diagnosis.
      
      Patient symptoms: ${symptoms}
      
      Respond in the following JSON format only:
      {
        "condition": "possible medical condition",
        "confidence": 0.XX (a number between 0 and 1),
        "explanation": "brief explanation of the diagnosis",
        "recommendations": "recommendations for the patient",
        "symptoms": ["extracted symptom 1", "extracted symptom 2", "..."]
      }
      
      Be conservative with your confidence score. Only use high confidence for clear cases.
    `;
  }

  /**
   * Parses AI response to extract structured data
   */
  private parseAiResponse(aiResponse: string) {
    try {
      // Try to parse as JSON
      const responseObj = JSON.parse(aiResponse);

      return {
        condition: responseObj.condition || 'Undetermined',
        confidence: parseFloat(responseObj.confidence) || 0.5,
        recommendations:
          responseObj.recommendations ||
          responseObj.explanation ||
          'Please consult with a healthcare professional.',
        extractedSymptoms: Array.isArray(responseObj.symptoms)
          ? responseObj.symptoms
          : [],
      };
    } catch (error) {
      // Fallback if parsing fails
      console.warn('Failed to parse AI response as JSON:', error);
      return {
        condition: 'Undetermined',
        confidence: 0.5,
        recommendations: 'Please consult with a healthcare professional.',
        extractedSymptoms: [],
      };
    }
  }

  /**
   * Finds or creates a symptom in the database
   */
  private async findOrCreateSymptom(description: string) {
    const existingSymptom = await this.prisma.symptom.findFirst({
      where: {
        description: {
          equals: description,
          mode: 'insensitive', // Case insensitive search
        },
      },
    });

    if (existingSymptom) {
      return existingSymptom;
    }

    return await this.prisma.symptom.create({
      data: {
        description,
      },
    });
  }

  /**
   * Gets symptom chat history for a user
   */
  async getSymptomChatHistory(userId: string) {
    return this.prisma.symptomChat.findMany({
      where: {
        userId,
      },
      include: {
        symptoms: {
          include: {
            symptom: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Gets a specific symptom chat by ID
   */
  async getSymptomChatById(chatId: string) {
    return this.prisma.symptomChat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        symptoms: {
          include: {
            symptom: true,
          },
        },
      },
    });
  }
}
