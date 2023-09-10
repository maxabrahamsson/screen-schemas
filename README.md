# Screen-Schemas

Generate screen descriptions from a directory of screen components for routes and navigation.

## Installation

```bash
npm install screen-schemas
```

or

```bash
yarn add screen-schemas
```

## Usage

This package provides a command-line interface to generate a JSON file describing the screens in your application. It scans a directory for `.tsx` files, extracts configuration from comments in the files, and outputs a JSON file.

Here's an example of how to use it:

```bash
npx screen-schemas './src/screens/*.tsx' './routes.json'
```

In this example, `screen-schemas` will scan all `.tsx` files in the `./src/screens/` directory and output a `routes.json` file in the current directory.

### Screen Configuration

You can provide configuration for each screen by adding a comment in the `.tsx` file with the following format:

```ts
// @screenConfig: { "title": "Home", "path": "/home", "order": 1 }
```

The `@screenConfig` comment should contain a JSON object with the following properties:

- `title`: The title of the screen.
- `path`: The path for the route to this screen.
- `order`: (optional) The order of this screen in navigation. Screens are sorted by this property in ascending order.

If no `@screenConfig` comment is provided, default values will be generated based on the file name.

### Command-Line Interface

The command-line interface accepts two positional arguments:

- `screensDirectory`: The directory to scan for `.tsx` files.
- `jsonPath`: The path to output the JSON file.

You can get help on how to use it with:

```bash
npx screen-schemas --help
```

## Contributing

Contributions are welcome! Please open an issue if you encounter any problems or have a feature request.

## License

ISC
