# API Documentation

## Overview

This document describes the data structures and interfaces used in the IWOS web application. While the current implementation uses static JSON files, this API documentation provides a foundation for future backend integration.

## Data Structures

### Configuration Object

The main configuration object controls application behavior.

**Location**: `/data/config.json`

```json
{
  "appName": "string",
  "version": "string",
  "description": "string",
  "author": "string",
  "repository": "string",
  "theme": {
    "defaultTheme": "light" | "dark",
    "enableThemeToggle": boolean,
    "storageKey": "string"
  },
  "navigation": {
    "enableSmoothScroll": boolean,
    "scrollOffset": number,
    "mobileBreakpoint": number
  },
  "features": {
    "animations": boolean,
    "analyticsEnabled": boolean,
    "searchEnabled": boolean
  },
  "api": {
    "baseUrl": "string",
    "timeout": number
  },
  "ui": {
    "showLoadingIndicators": boolean,
    "enableNotifications": boolean,
    "defaultLanguage": "string"
  }
}
```

### Framework Data Object

Contains all framework-related data including principles, phases, and metrics.

**Location**: `/data/data.json`

#### Framework Metadata

```json
{
  "framework": {
    "name": "string",
    "acronym": "string",
    "version": "string",
    "description": "string"
  }
}
```

#### Principle Object

```json
{
  "id": "string",
  "name": "string",
  "order": number,
  "description": "string",
  "benefits": ["string"],
  "steps": [
    {
      "name": "string",
      "description": "string"
    }
  ],
  "characteristics": ["string"],
  "methods": ["string"]
}
```

**Fields**:
- `id`: Unique identifier for the principle
- `name`: Display name
- `order`: Sort order (1-4)
- `description`: Brief description
- `benefits`/`steps`/`characteristics`/`methods`: Varies by principle type

#### Workflow Phase Object

```json
{
  "id": "string",
  "name": "string",
  "icon": "string",
  "order": number,
  "description": "string",
  "activities": ["string"]
}
```

**Fields**:
- `id`: Unique identifier for the phase
- `name`: Display name
- `icon`: Emoji or icon representation
- `order`: Sort order (1-9)
- `description`: Phase description
- `activities`: List of activities in this phase

#### Metric Object

```json
{
  "name": "string",
  "description": "string",
  "unit": "string",
  "target": "increase" | "decrease"
}
```

#### Resource Object

```json
{
  "type": "documentation" | "template" | "example",
  "title": "string",
  "description": "string",
  "url": "string"
}
```

## JavaScript APIs

### Theme API

The theme API provides functions to manage the application theme.

**Namespace**: `window.IWOSTheme`

#### Methods

##### `getCurrentTheme()`

Returns the current theme.

```javascript
const theme = window.IWOSTheme.getCurrentTheme();
// Returns: "light" | "dark"
```

##### `setTheme(theme)`

Sets the application theme.

```javascript
window.IWOSTheme.setTheme('dark');
```

**Parameters**:
- `theme` (string): "light" or "dark"

##### `toggleTheme()`

Toggles between light and dark themes.

```javascript
window.IWOSTheme.toggleTheme();
```

### Utilities API

General utility functions for the application.

**Namespace**: `window.IWOSUtils`

#### Methods

##### `formatDate(date)`

Formats a date for display.

```javascript
const formatted = window.IWOSUtils.formatDate(new Date());
// Returns: "February 11, 2026"
```

**Parameters**:
- `date` (Date|string): Date to format

**Returns**: Formatted date string

##### `debounce(func, wait)`

Creates a debounced version of a function.

```javascript
const debouncedHandler = window.IWOSUtils.debounce(() => {
  console.log('Debounced!');
}, 250);
```

**Parameters**:
- `func` (function): Function to debounce
- `wait` (number): Milliseconds to wait

**Returns**: Debounced function

## Events

### Custom Events

The application emits custom events for various interactions.

#### `themeChanged`

Fired when the theme is changed.

```javascript
document.addEventListener('themeChanged', function(e) {
  console.log('New theme:', e.detail.theme);
});
```

**Event Detail**:
```json
{
  "theme": "light" | "dark"
}
```

## Local Storage

### Keys Used

The application stores data in localStorage:

| Key | Description | Type | Example |
|-----|-------------|------|---------|
| `iwos-theme` | Current theme preference | string | `"dark"` |

## Future Enhancements

### Planned API Endpoints

For future backend integration:

#### GET `/api/framework`

Retrieve framework data.

**Response**:
```json
{
  "success": true,
  "data": {
    "framework": { ... },
    "principles": [ ... ],
    "workflowPhases": [ ... ]
  }
}
```

#### GET `/api/resources`

Retrieve available resources.

**Response**:
```json
{
  "success": true,
  "data": {
    "resources": [ ... ]
  }
}
```

#### POST `/api/feedback`

Submit user feedback.

**Request**:
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Feedback received"
}
```

## Error Handling

All API interactions should follow this error structure:

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": { ... }
  }
}
```

## Versioning

The API follows semantic versioning (semver). Current version: 1.0.0

Breaking changes will increment the major version number.

## Rate Limiting

(For future backend implementation)

- Rate limit: 100 requests per minute per IP
- Burst allowance: 10 requests
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Support

For API questions or issues:
- Open an issue on GitHub
- Refer to the main documentation
- Check code examples in `/web/js/`
