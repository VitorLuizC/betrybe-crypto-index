class InvalidAuthenticationParametersError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'InvalidAuthenticationParametersError';
    this.message = message;
  }
}

export default InvalidAuthenticationParametersError;
