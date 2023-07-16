/**
 * Abstract class to convert mongo document to DTO
 */
export abstract class Mapper<I, O> {
  /**
   *
   * @param input - mongo document
   * @returns DTO
   */
  abstract convert(input: I): O;
}
