export class JwtPassConfig {
  static get urls(): string[] {
    return [
      // here add path to exclude from jwt auth
    ];
  }
}
