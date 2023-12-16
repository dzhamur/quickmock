# quickmock

`quickmock` is an advanced mock data generator designed for flexibility and ease of use. It enables customizable and schema-driven mock data creation for a variety of formats and scenarios, making it an ideal tool for developers in testing and development environments.

## Features

- **Schema-Driven Mocks**: Define your data structure using a simple schema.
- **Dynamic Data Generation**: Generate data dynamically for different testing scenarios.
- **Customizable Formats**: Supports generating both array and object formats with custom keys.
- **Easy to Use**: Simple, intuitive API for quick integration into your projects.

## Installation

Install the library with npm:

```sh
npm install quickmock
```

## Usage

Here's a basic example of using `quickmock`:

```js
import { MockGenerator } from "quickmock";

// Define a schema for the mock data
const schema = {
  name: () => "John Doe",
  age: () => 30,
};

// Create a new MockGenerator instance
const mockGenerator = new MockGenerator(schema);

// Generate mock data
const mockData = mockGenerator.getMockData();

console.log(mockData); // { name: 'John Doe', age: 30 }
```

### Advanced Usage

Generate an array of mock data:

```js
const users = mockGenerator.getMockData(5);
console.log(users); // Array of 5 users
```

Generate an object with custom keys:

```js
const userObject = mockGenerator.getMockData(3, {
  type: "object",
  options: { keyGenerator: () => "user-" + Math.random() },
});
console.log(userObject); // Object with 3 user entries with custom keys
```

## API Reference

- `MockGenerator(schema)`: Constructor to create a mock generator instance.
  - `schema`: A schema defining how to generate each property.
- `getMockData(size, format)`: Method to generate mock data.
  - `size` (optional): Number of mock data items to generate.
  - `format` (optional): Format of the mock data ('array' or object configuration).

## Contributing

Contributions to `quickmock` are always welcome, whether it's improving the documentation, adding new features, or reporting bugs. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

## License

`quickmock` is [MIT licensed](LICENSE).
