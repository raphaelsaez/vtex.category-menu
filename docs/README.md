# Category Menu

## Configuration

1. Add the app to your theme's dependencies on the `manifest.json`, for example:

```json
  dependencies: {
    "vtex.category-menu": "2.x"
  }
```

2. Add the `category-menu` block into your theme.

```json
{
  "category-menu": {
    "props": {
      "showAllDepartments": true,
      "showSubcategories": true,
      "departments": []
    }
  }
}
```
