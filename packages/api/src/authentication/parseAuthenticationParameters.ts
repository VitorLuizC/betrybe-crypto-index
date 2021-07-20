import type AuthenticationParameters from './AuthenticationParameters';
import AUTHENTICATION_SCHEMA from './AUTHENTICATION_SCHEMA';
import InvalidAuthenticationParametersError from './InvalidAuthenticationParametersError';

function parseAuthenticationParameters(
  parameters: unknown,
): AuthenticationParameters {
  if (!AUTHENTICATION_SCHEMA.isValidSync(parameters, { strict: true }))
    throw new InvalidAuthenticationParametersError('');
  return parameters;
}

export default parseAuthenticationParameters;
