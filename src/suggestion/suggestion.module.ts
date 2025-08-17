import { Module } from "@nestjs/common";
import { SuggestionController } from "./suggestion.controller";
import { suggestionService } from "./suggestion.service";



@Module({
   controllers:[SuggestionController],
   providers:[suggestionService],
})

export class SuggestionModule{};