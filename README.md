# 🍽️ Kitch

**Java-based inventory and recipe management for your kitchen.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A desktop application for managing kitchen inventory, shopping lists, and recipes with a clean Swing GUI.

## Features

- 📦 **Inventory Management** — Track products, brands, quantities, and expiry dates
- 🛒 **Shopping Lists** — Auto-move out-of-stock items to shopping
- 🍳 **Recipe Builder** — Create recipes with ingredients and step-by-step instructions
- 🔍 **Search & Filter** — Quick search across all tables
- 💾 **Auto-Save** — Changes persist automatically to CSV files
- 🎨 **Modern UI** — Custom dark theme with Oxford/Cambridge color palette

## Tech Stack

[![Java](https://img.shields.io/badge/Java_17+-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Swing](https://img.shields.io/badge/Swing-GUI-blue?style=flat-square)](https://docs.oracle.com/javase/tutorial/uiswing/)

## Quick Start

### Prerequisites

```bash
Java JDK 17 or higher
```

### Installation & Run

```bash
git clone https://github.com/yourusername/kitch
cd kitch

# Compile
javac -d bin src/kitchgui/**/*.java

# Run
java -cp bin kitchgui.Main
```

Or use your IDE to run `kitchgui.Main`.

## Project Structure

```
kitch/
├── data/                      # CSV data files
│   ├── inventory.csv         # Current inventory
│   ├── shopping.csv          # Shopping list
│   ├── ingredients/          # Recipe ingredients
│   │   ├── ingredients1.csv
│   │   └── ingredients2.csv
│   └── recipes/              # Recipe instructions
│       ├── recipe1.txt
│       └── recipe2.txt
├── src/
│   └── kitchgui/
│       ├── Main.java         # Entry point & color palette
│       ├── controller/       # Business logic
│       │   ├── InventoryService.java
│       │   └── RecipeService.java
│       ├── model/            # Data models
│       │   ├── Item.java
│       │   ├── Recipe.java
│       │   └── ItemTableModel.java
│       └── ui/               # Swing components
│           ├── GUIDesign.java      # Main inventory UI
│           └── RecipeListUI.java   # Recipe builder UI
```

## Data Format

### Inventory/Shopping CSV

```csv
Product,Brand,Category,Quantity,Expiry
Milk,Trader Joe's,Dairy,2,2025-12-10
Chicken Thighs,Trader Joe's,Meat,1,2025-11-20
Onions,Yellow,Produce,5,2026-01-15
```

### Recipe Files

**ingredients1.csv**
```csv
Product,Brand,Category,Quantity,Expiry
Chicken Thighs,Any,Meat,1,
Soy Sauce,Any,Pantry,1,
Brown Sugar,Any,Pantry,1,
```

**recipe1.txt**
```
Cut chicken into bite-size pieces and pat dry.
Whisk soy sauce and brown sugar; simmer to thicken.
Sear chicken, pour sauce, reduce until glossy and sticky.
```

## Keyboard Shortcuts

### Main Window
- `Ctrl/Cmd + R` — Open Recipe Builder

### Recipe Builder
- `Ctrl/Cmd + 1` — Switch to Recipe 1
- `Ctrl/Cmd + 2` — Switch to Recipe 2

## Design

### Color Palette

- **Oxford Blue** (#011936) — App background
- **Charcoal** (#465362) — Card backgrounds
- **Cambridge Blue** (#82A3A1) — Headers
- **Olivine** (#9FC490) — Primary accent
- **Tea Green** (#C0DFA1) — Secondary accent

### Architecture

- **MVC Pattern** — Models, views (UI), and controllers (services) are separated
- **Observer Pattern** — Tables auto-update when models change
- **File-based Storage** — Simple CSV persistence without external database

## Features in Detail

### Inventory Management
- Add, update, and delete items
- Track product name, brand, category, quantity, and expiry date
- Filter items with live search
- Move zero-quantity items to shopping list with one click

### Recipe Builder
- Manage up to 2 recipes (easily extensible)
- Each recipe has ingredients list and step-by-step instructions
- Ingredients use same Item model as inventory
- Auto-save on every change

### Auto-Save
All changes persist immediately to CSV files:
- No "Save" button needed
- Toast notification confirms saves
- Data survives app restarts

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Miguel Joaquin Beltran**  
🎓 Computer Science @ UC Davis  
🔗 [LinkedIn](https://www.linkedin.com/in/miguel-j-beltran/)  
📧 [Email](mailto:migueljoaquinbeltran@gmail.com)

---
