package com.kitch.config;

import com.kitch.entity.*;
import com.kitch.repository.ItemRepository;
import com.kitch.repository.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final ItemRepository itemRepository;
    private final RecipeRepository recipeRepository;

    @Value("${kitch.seed-data:true}")
    private boolean seedData;

    public DataInitializer(ItemRepository itemRepository, RecipeRepository recipeRepository) {
        this.itemRepository = itemRepository;
        this.recipeRepository = recipeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!seedData || itemRepository.count() > 0 || recipeRepository.count() > 0) {
            return;
        }

        seedItems("data/inventory.csv", ItemType.INVENTORY);
        seedItems("data/shopping.csv", ItemType.SHOPPING);
        seedRecipe("Sticky Chicken", "data/ingredients/ingredients1.csv", "data/recipes/recipe1.txt");
        seedRecipe("Garlic Spaghetti", "data/ingredients/ingredients2.csv", "data/recipes/recipe2.txt");
    }

    private void seedItems(String csvPath, ItemType type) throws Exception {
        List<String> lines = readResourceLines(csvPath);
        boolean first = true;
        for (String line : lines) {
            if (line.trim().isEmpty()) continue;
            if (first) { first = false; continue; }
            String[] cols = splitCsv(line, 5);
            int qty = 0;
            try {
                qty = Integer.parseInt(cols[3].trim());
            } catch (Exception e) {
                log.warn("Failed to parse quantity '{}' in {}: {}", cols[3].trim(), csvPath, e.getMessage());
            }
            Item item = new Item(unescape(cols[0]), unescape(cols[1]), unescape(cols[2]), qty, unescape(cols[4]), type);
            itemRepository.save(item);
        }
    }

    private void seedRecipe(String name, String ingredientsCsvPath, String stepsTxtPath) throws Exception {
        Recipe recipe = new Recipe(name);
        recipe = recipeRepository.save(recipe);

        List<String> ingLines = readResourceLines(ingredientsCsvPath);
        boolean firstIng = true;
        for (String line : ingLines) {
            if (line.trim().isEmpty()) continue;
            if (firstIng) { firstIng = false; continue; }
            String[] cols = splitCsv(line, 5);
            int qty = 0;
            try {
                qty = Integer.parseInt(cols[3].trim());
            } catch (Exception e) {
                log.warn("Failed to parse quantity '{}' in {}: {}", cols[3].trim(), ingredientsCsvPath, e.getMessage());
            }
            Item ingredient = new Item(unescape(cols[0]), unescape(cols[1]), unescape(cols[2]), qty, unescape(cols[4]), ItemType.INGREDIENT);
            ingredient.setRecipe(recipe);
            recipe.getIngredients().add(ingredient);
        }

        List<String> stepLines = readResourceLines(stepsTxtPath);
        int order = 1;
        for (String line : stepLines) {
            if (line.trim().isEmpty()) continue;
            RecipeStep step = new RecipeStep(line.trim(), order++, recipe);
            recipe.getSteps().add(step);
        }

        recipeRepository.save(recipe);
    }

    private List<String> readResourceLines(String path) throws Exception {
        List<String> lines = new ArrayList<>();
        ClassPathResource resource = new ClassPathResource(path);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                lines.add(line);
            }
        }
        return lines;
    }

    // Ported from the original Item.splitCsv()
    private static String[] splitCsv(String line, int expected) {
        String[] out = new String[expected];
        StringBuilder sb = new StringBuilder();
        boolean inQ = false;
        int idx = 0;
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (c == '"') {
                inQ = !inQ;
                sb.append(c);
            } else if (c == ',' && !inQ) {
                if (idx < expected) out[idx++] = sb.toString();
                sb.setLength(0);
            } else {
                sb.append(c);
            }
        }
        if (idx < expected) out[idx] = sb.toString();
        for (int i = 0; i < out.length; i++)
            if (out[i] == null) out[i] = "";
        return out;
    }

    private static String unescape(String s) {
        s = s == null ? "" : s.trim();
        if (s.startsWith("\"") && s.endsWith("\"") && s.length() >= 2) {
            s = s.substring(1, s.length() - 1).replace("\"\"", "\"");
        }
        return s;
    }
}
