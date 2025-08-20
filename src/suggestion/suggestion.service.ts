import { Injectable } from '@nestjs/common';
import { data } from './problems';

type Difficulty = 'easy' | 'medium' | 'hard';
const tagOrder = [
  'basic',
  'arithmetic',
  'array',
  '2D array',
  'string',
  'anagram',
  'KMP',
  'Manacher',
  'hashing',
  'hash map',
  'binary search',
  'sorting',
  'recursion',
  'backtracking',
  'linked list',
  'binary tree',
  'binary search tree',
  'graph',
  'bfs',
  'dfs',
  '0-1 bfs',
  'bellman ford',
  'dp',
  '2D dp',
  'bit manipulation',
  'bitmask',
  'segment tree',
  'fenwick tree',
  'combinatorics',
  'game theory',
];

@Injectable()
export class suggestionService {
  private difficultyOrder: Difficulty[] = ['easy', 'hard', 'medium'];

  suggestNextQuestion({
    failedCount,
    difficulty,
    category,
    doneQuestions,
    solvedCategoryStats,
  }: {
    failedCount: number;
    difficulty: Difficulty;
    category: string;
    doneQuestions: string[];
    solvedCategoryStats: { easy: number; medium: number; hard: number };
  }) {
    let nextDifficulty: Difficulty = difficulty;
    let nextTags: string = category;

    if (failedCount >= 4) {
      if (difficulty === 'hard') nextDifficulty = 'medium';
      else if (difficulty === 'medium') nextDifficulty = 'easy';
    } else {
      if (difficulty === 'easy' && solvedCategoryStats.easy >= 8) {
        nextDifficulty = 'medium';
      } else if (difficulty === 'medium' && solvedCategoryStats.medium >= 8) {
        nextDifficulty = 'hard';
      } else if (
        difficulty === 'hard' &&
        solvedCategoryStats.hard > 2 &&
        failedCount < 4
      ) {
        const currentIdx = tagOrder.indexOf(category);
        nextTags = tagOrder[(currentIdx + 1) % tagOrder.length]; // Fixed: assign to nextTags, not declare new variable
      }
    }

    const candidates = data.filter(
      (p) =>
        p.tags && p.tags.includes(nextTags) && p.difficulty === nextDifficulty,
    );

    const next = candidates.find((p) => !doneQuestions.includes(p.slug));
    return next ? next.slug : null;
  }
}
