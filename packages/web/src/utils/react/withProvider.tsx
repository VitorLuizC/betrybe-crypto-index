import React, { ComponentType } from "react";

/**
 * Função responsável por aninhar componentes Provider e
 * Consumer.
 */
const withProvider = <ProviderProps extends {}>(
  Provider: ComponentType<ProviderProps>
) => <Props extends {}>(Component: ComponentType<Props>) => (
  props: Props & ProviderProps
) => (
  <Provider {...(props as ProviderProps)}>
    <Component {...(props as Props)} />
  </Provider>
);

export default withProvider;
