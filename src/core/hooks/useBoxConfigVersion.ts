import * as React from 'react';
import { getBoxConfigVersion, subscribeBoxConfig } from '@/core/configuration';

/**
 * Internal hook that triggers rerenders when the global Box configuration changes.
 *
 * This is used to make components pick up updates from `configureBox()` / `resetBoxConfig()`
 * even after mount.
 *
 * @internal
 */
export function useBoxConfigVersion(): number {
  const [version, setVersion] = React.useState(() => getBoxConfigVersion());

  React.useEffect(() => {
    return subscribeBoxConfig(() => {
      setVersion(getBoxConfigVersion());
    });
  }, []);

  return version;
}
