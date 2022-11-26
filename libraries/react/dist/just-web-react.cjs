"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const react = require("react");
const states = require("@just-web/states");
const typePlus = require("type-plus");
const AppContext = react.createContext(void 0);
function useAppContext() {
  const app = react.useContext(AppContext);
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
  const Component = react.lazy(async () => {
    const [m] = await cachedExtendingApp();
    return { default: m[key] };
  });
  return {
    [key]: Component,
    getExtendingApp: () => cachedExtendingApp().then(([, extendedApp]) => extendedApp)
  };
}
function useStore(store, getState, updateStore) {
  const [value, setValue] = react.useState(() => getState(store.get()));
  react.useEffect(() => store.onChange((s2) => setValue(getState(s2))), []);
  const s = states.createStore({ a: 1 });
  s.set((d) => {
    d.a += 1;
  });
  return [
    value,
    react.useCallback((updater) => {
      if (updateStore) {
        store.set(
          (s2) => updateStore(
            s2,
            typePlus.isType(updater, (u) => typeof u === "function") ? updater(getState(s2)) : updater
          )
        );
        return setValue(getState(store.get()));
      }
      return setValue(updater);
    }, [])
  ];
}
function createStoreContext() {
  return react.createContext(void 0);
}
function useStoreContext(reactContext, getState, updateStore) {
  const store = react.useContext(reactContext);
  if (!store) {
    throw new Error("Context.Provider must be used before using useStoreContext()");
  }
  return useStore(store, getState, updateStore);
}
exports.AppContext = AppContext;
exports.createStoreContext = createStoreContext;
exports.lazyImport = lazyImport;
exports.useAppContext = useAppContext;
exports.useStore = useStore;
exports.useStoreContext = useStoreContext;
//# sourceMappingURL=just-web-react.cjs.map
