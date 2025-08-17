import { Injectable } from "@nestjs/common";
import { dsaProblems } from "./data";

type Difficulty = "easy" | "medium" | "hard";
const categoryOrder = ['array', 'string', 'tree', 'graph', 'dp'];


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
  }){
     let nextDifficulty: Difficulty = difficulty;
     let nextCategory: string = category;

    if(failedCount>=4){
      if(difficulty==="hard")nextDifficulty="medium";
      else if(difficulty==="medium")nextDifficulty="easy";  
    }

    else{
      if(difficulty==='easy'&& solvedCategoryStats.easy>=8){
        nextDifficulty='medium';
      }else if(difficulty==='medium'&& solvedCategoryStats.medium>=8)
        nextDifficulty="hard";
        else if(difficulty==='hard' && solvedCategoryStats.hard>2 && failedCount<4){
         const currentIdx = categoryOrder.indexOf(category);
        const nextCategory = categoryOrder[(currentIdx + 1) % categoryOrder.length];
        }
    }
    const candidates=dsaProblems.filter((p)=>p.category.includes(nextCategory)&& p.difficulty===nextDifficulty);
    const next=candidates.find((p)=>!doneQuestions.includes(p.slug));
     return next?next.slug:null;
  }
}