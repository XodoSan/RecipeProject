import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeDto } from 'src/app/Classes/RecipeDto';
import { StepItem } from 'src/app/Classes/StepItem';
import { TagItem } from 'src/app/Classes/TagItem';
import { IngredientItem } from 'src/app/Classes/IngredientItem';

var recipeDtoById: RecipeDto;

@Component({
  selector: 'app-recipe-info-page',
  templateUrl: './recipe-info-page.component.html',
  styleUrls: ['./recipe-info-page.component.css']
})
export class RecipeInfoPageComponent implements OnInit {

  recipeDtosById: RecipeDto[] = [];

  private _http: HttpClient;

  constructor(http: HttpClient, private route: ActivatedRoute, private router: Router)
  {
    this.route.queryParams.subscribe(params => {
    this.currentRecipeDtoId = params['id']});
    this._http = http;
  }
  
  currentRecipeDtoName = '';
  currentRecipeDtoDescription = '';
  currentRecipeDtoPersonNumber = 0;
  currentRecipeDtoCookingTime = 0;
  currentRecipeDtoLikes = 0;
  currentRecipeDtoStars = 0;
  currentRecipeDtoIsLiked = "../../../assets/like.svg";
  currentRecipeDtoImage = '';

  currentStepItemNumber = 1;
  currentStepItemName = '';
  steps: StepItem[] = [];

  currentTagItemName = '';
  tags: TagItem[] = [];
  StringTags: string[] =[];

  currentIngredientItemName = '';
  currentIngredientItemProduct = '';
  ingredientItems: IngredientItem[] = [];

  currentRecipeDtoId = 0;

  async ngOnInit(): Promise<void>
  {
    this.currentRecipeDtoId = Number(this.route.snapshot.paramMap.get('id'));

    recipeDtoById = await this._http.get<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();

    this.currentRecipeDtoName = recipeDtoById.recipeName;
    this.currentRecipeDtoDescription = recipeDtoById.recipeDescription;
    this.currentRecipeDtoPersonNumber = recipeDtoById.personNumber;
    this.currentRecipeDtoCookingTime = recipeDtoById.cookingTime;
    this.currentRecipeDtoLikes = recipeDtoById.likes;
    this.currentRecipeDtoStars = recipeDtoById.stars;
    this.currentRecipeDtoIsLiked = recipeDtoById.isLiked;
    this.currentRecipeDtoImage = recipeDtoById.recipeImage;

    if (recipeDtoById.likes == 0) this.currentRecipeDtoIsLiked = "../../../assets/like.svg";
    else this.currentRecipeDtoIsLiked = "../../../assets/PushedLike.svg";
    
    for (let i = 0; i < recipeDtoById.steps.length; i++)
    {
      let newStepNumber = i + 1;
      let newStep: StepItem = new StepItem(recipeDtoById.steps[i].stepDescription, newStepNumber)
      this.steps.push(newStep);
    }

    this.tags = recipeDtoById.tags;
    this.ingredientItems = recipeDtoById.ingredientItems;
  }
  
  async goBack()
  {
    this.router.navigate(['/']);
  }

  async goToUpdateRecipe()
  {
    this.router.navigate(['/change_recipe/' + this.currentRecipeDtoId]);
  }

  async deleteRecipe()
  {
    await this._http.delete<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();
    this.router.navigate(['/'])
  }

  async updateRecipeForLike(recipeId: number)
  {
    this.currentRecipeDtoId = recipeId;
    
    recipeDtoById = await this._http.get<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();
    this.currentRecipeDtoName = recipeDtoById.recipeName;
    this.currentRecipeDtoDescription = recipeDtoById.recipeDescription;
    this.currentRecipeDtoPersonNumber = recipeDtoById.personNumber;
    this.currentRecipeDtoCookingTime = recipeDtoById.cookingTime;
    this.currentRecipeDtoLikes = recipeDtoById.likes;
    this.currentRecipeDtoStars = recipeDtoById.stars;
    this.currentRecipeDtoImage = recipeDtoById.recipeImage;
    this.steps = recipeDtoById.steps;
    this.tags = recipeDtoById.tags;
    this.ingredientItems = recipeDtoById.ingredientItems;

    if (this.currentRecipeDtoLikes == 0) this.currentRecipeDtoLikes++;
    else this.currentRecipeDtoLikes--;

    let newRecipeDto: RecipeDto = new RecipeDto(
      this.currentRecipeDtoId,
      this.currentRecipeDtoName,
      this.currentRecipeDtoDescription,
      this.currentRecipeDtoPersonNumber,
      this.currentRecipeDtoCookingTime,
      this.currentRecipeDtoLikes,
      this.currentRecipeDtoIsLiked,
      this.currentRecipeDtoStars,
      this.currentRecipeDtoImage,
      this.steps,
      this.tags,
      this.ingredientItems);

    await this._http.put(`/api/Recipe/${recipeId}`, newRecipeDto).toPromise();    
    recipeDtoById = await this._http.get<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();    

    if (recipeDtoById.likes == 0) this.currentRecipeDtoIsLiked = "../../../assets/like.svg";
    else this.currentRecipeDtoIsLiked = "../../../assets/PushedLike.svg";
  }

  async updateRecipeForStars(recipeId: number)
  {
    this.currentRecipeDtoId = recipeId;
    
    recipeDtoById = await this._http.get<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();
    this.currentRecipeDtoName = recipeDtoById.recipeName;
    this.currentRecipeDtoDescription = recipeDtoById.recipeDescription;
    this.currentRecipeDtoPersonNumber = recipeDtoById.personNumber;
    this.currentRecipeDtoCookingTime = recipeDtoById.cookingTime;
    this.currentRecipeDtoLikes = recipeDtoById.likes;
    this.currentRecipeDtoStars = recipeDtoById.stars;
    this.currentRecipeDtoImage = recipeDtoById.recipeImage;
    this.steps = recipeDtoById.steps;
    this.tags = recipeDtoById.tags;
    this.ingredientItems = recipeDtoById.ingredientItems;

    if (this.currentRecipeDtoStars == 0) this.currentRecipeDtoStars++
    else this.currentRecipeDtoStars--;

    let newRecipeDto: RecipeDto = new RecipeDto(
      this.currentRecipeDtoId,
      this.currentRecipeDtoName,
      this.currentRecipeDtoDescription,
      this.currentRecipeDtoPersonNumber,
      this.currentRecipeDtoCookingTime,
      this.currentRecipeDtoLikes,
      this.currentRecipeDtoIsLiked,
      this.currentRecipeDtoStars,
      this.currentRecipeDtoImage,
      this.steps,
      this.tags,
      this.ingredientItems);

    await this._http.put(`/api/Recipe/${recipeId}`, newRecipeDto).toPromise();

  }

}
