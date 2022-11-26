import { createContext, useContext, lazy, useState, useEffect, useCallback } from "react";
import { createStore } from "@just-web/states";
import { isType } from "type-plus";
const AppContext = createContext(void 0);
function useAppContext() {
  const app = useContext(AppContext);
  if (!app) {
    throw new Error("AppContext.Provider must be used before using useAppContext()");
  }
  return app;
}
function lazyImport(importPlugin, key, extendPlugin) {
  let cached;
  function cachedExtendingApp() {
    return cached ? cached : cached = extendingApp();
  }
  async function extendingApp() {
    const m = await importPlugin;
    const extendedApp = extendPlugin(m.default);
    await extendedApp.start();
    return [m, extendedApp];
  }
  const Component = lazy(async () => {
    const [m] = await cachedExtendingApp();
    return { default: m[key] };
  });
  return {
    [key]: Component,
    getExtendingApp: () => cachedExtendingApp().then(([, extendedApp]) => extendedApp)
  };
}
function useStore(store, getState, updateStore) {
  const [value, setValue] = useState(() => getState(store.get()));
  useEffect(() => store.onChange((s2) => setValue(getState(s2))), []);
  const s = createStore({ a: 1 });
  s.set((d) => {
    d.a += 1;
  });
  return [
    value,
    useCallback((updater) => {
      if (updateStore) {
        store.set(
          (s2) => updateStore(
            s2,
            isType(updater, (u) => typeof u === "function") ? updater(getState(s2)) : updater
          )
        );
        return setValue(getState(store.get()));
      }
      return setValue(updater);
    }, [])
  ];
}
function createStoreContext() {
  return createContext(void 0);
}
function useStoreContext(reactContext, getState, updateStore) {
  const store = useContext(reactContext);
  if (!store) {
    throw new Error("Context.Provider must be used before using useStoreContext()");
  }
  return useStore(store, getState, updateStore);
}
export {
  AppContext,
  createStoreContext,
  lazyImport,
  useAppContext,
  useStore,
  useStoreContext
};
//# sourceMappingURL=just-web-react.js.map
