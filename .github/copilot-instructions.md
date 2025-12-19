# Yalidine React SDK Development

This workspace contains the source code for the Yalidine React/Next.js SDK.

## Project Overview

- **Language**: TypeScript
- **Frameworks**: React, Next.js
- **Package Manager**: npm
- **Build Tool**: Rollup
- **Test Framework**: Jest
- **Linter**: ESLint
- **Formatter**: Prettier

## Key Directories

- `src/` - Source code
  - `client.ts` - Core Yalidine API client
  - `types.ts` - TypeScript type definitions
  - `react/` - React-specific components and hooks
  - `__tests__/` - Test files
- `examples/` - Usage examples
- `dist/` - Compiled output (generated)

## Scripts

- `npm run build` - Build the library
- `npm run dev` - Watch mode for development
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run prepare` - Pre-publish hook

## Development Workflow

1. Create or update source files in `src/`
2. Write tests in `src/__tests__/`
3. Run `npm run lint` and `npm run format`
4. Run `npm test` to verify tests pass
5. Run `npm run build` to create dist files
6. Commit and push changes

## Next Steps

1. Set up GitHub repository
2. Update package.json with correct repository URL
3. Get Yalidine API credentials
4. Test integration with real API
5. Publish to npm registry
