/**
 * Defines a schema type for generating mock data.
 * @type {Schema<T>} - A mapping from the properties of type T to functions that return mock values for these properties.
 */
type Schema<T> = {
  [K in keyof T]: () => T[K];
};

/**
 * Options for formatting the mock data output.
 * @type {object}
 * @property {"object"} type - Specifies the format type.
 * @property {object} options - Additional options for the format type.
 * @property {() => string} [options.keyGenerator] - Optional function to generate keys for object format.
 */
interface FormatOptions {
  type: "object";
  options?: {
    keyGenerator?: () => string;
  };
}

/**
 * MockGenerator class for generating mock data based on a provided schema.
 * @class
 * @template T - The type of object to generate mock data for.
 */
export class MockGenerator<T> {
  private readonly schema: Schema<T>;

  /**
   * Creates an instance of MockGenerator.
   * @param {Schema<T>} schema - The schema defining how to generate each property of type T.
   */
  constructor(schema: Schema<T>) {
    this.schema = schema;
  }

  /**
   * Generates mock data based on the schema.
   * @returns {T} - A mock data object of type T.
   */
  private createMockData(): T {
    const mockData: any = {};
    for (const key in this.schema) {
      mockData[key] = this.schema[key]();
    }
    return mockData as T;
  }

  /**
   * Generates and returns mock data.
   * If 'size' is not provided, returns a single object.
   * If 'size' is provided, returns data in specified format.
   * @param {number} [size] - Optional number of mock data items to generate.
   * @param {"array" | FormatOptions} [format="array"] - Format of the mock data output, default is array.
   * @returns {T | T[] | Record<string, T>} - Mock data in the specified format.
   */
  public getMockData(
    size?: number,
    format: "array" | FormatOptions = "array",
  ): T[] | Record<string, T> | T {
    // If size is not provided return a single object
    if (size === undefined) {
      return this.createMockData();
    }

    if (typeof format === "object" && format.type === "object") {
      const objectData: Record<string, T> = {};
      const keyGen =
        format.options?.keyGenerator ??
        (() => `item-${Math.random().toString(16).slice(2)}`);
      for (let i = 0; i < size; i++) {
        objectData[keyGen()] = this.createMockData();
      }
      return objectData;
    }

    // Default to array format
    return Array.from({ length: size }, () => this.createMockData());
  }
}
