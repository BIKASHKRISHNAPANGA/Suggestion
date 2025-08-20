import { Body, Controller, Post } from '@nestjs/common';
import { suggestionService } from './suggestion.service';

@Controller('suggestion')
export class SuggestionController {
  constructor(private readonly suggestionService: suggestionService) {}

  @Post('next')
  getNextSuggestion(
    @Body()
    body: {
      failedCount: number;
      difficulty: 'easy' | 'medium' | 'hard';
      category: string;
      doneQuestions: string[];
      solvedStats: { easy: number; medium: number; hard: number }; // Changed from solvedCategoryStats
    },
  ) {
    return {
      nextQuestion: this.suggestionService.suggestNextQuestion({
        ...body,
        solvedCategoryStats: body.solvedStats, // Map solvedStats to solvedCategoryStats
      }),
    };
  }
}
