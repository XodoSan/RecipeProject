﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipe_Api.Data.Entities;

namespace Recipe_Api.Data.DbInfrasructure
{
    public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
    {
        public void Configure(EntityTypeBuilder<Recipe> builder)
        {
            builder.ToTable("Recipes")
                .HasKey(item => item.RecipeId);
            builder.Property(item => item.RecipeName).IsRequired();
            builder.Property(item => item.RecipeDescription).IsRequired();
            builder.Property(item => item.PersonNumber).IsRequired();
            builder.Property(item => item.CookingTime).IsRequired();
            builder.HasMany(item => item.Tags)
                .WithOne()
                .HasForeignKey(item => item.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(item => item.Steps)
                .WithOne()
                .HasForeignKey(item => item.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(item => item.IngredientItems)
                .WithOne()
                .HasForeignKey(item => item.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}