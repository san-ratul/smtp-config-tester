// src/mq.js
// Simple media-query manager + React hook for Vite/React apps

import { useEffect, useSyncExternalStore } from 'react';

const registry = new Map(); // name -> { mqList, listener, matches }
const CLASS_PREFIX = 'bp-';

function isMatch(name) {
  const e = registry.get(name);
  return e ? e.matches : false;
}

function addBodyClass(name) {
  try { document.body.classList.add(CLASS_PREFIX + name); } catch {}
}
function removeBodyClass(name) {
  try { document.body.classList.remove(CLASS_PREFIX + name); } catch {}
}

function handleChangeEntry(name, matches) {
  const entry = registry.get(name);
  if (!entry) return;
  entry.matches = matches;
  if (matches) {
    addBodyClass(name);
    entry.handlers?.enter?.();
  } else {
    removeBodyClass(name);
    entry.handlers?.exit?.();
  }
}

// Register (or replace) a named media query.
// handlers: { enter: fn, exit: fn } optional.
export function register(name, mediaQuery, handlers = {}) {
  // unregister if exists
  unregister(name);

  const mqList = window.matchMedia(mediaQuery);
  const entry = {
    mqList,
    handlers,
    matches: mqList.matches,
    listener: (ev) => handleChangeEntry(name, ev.matches)
  };
  registry.set(name, entry);

  // attach listener
  if (mqList.addEventListener) mqList.addEventListener('change', entry.listener);
  else mqList.addListener(entry.listener);

  // invoke initial handler
  if (entry.matches) {
    addBodyClass(name);
    handlers.enter?.();
  } else {
    removeBodyClass(name);
    handlers.exit?.();
  }
}

// Unregister a named media query and call exit if matched
export function unregister(name) {
  const entry = registry.get(name);
  if (!entry) return;
  const mqList = entry.mqList;
  try {
    if (mqList.removeEventListener) mqList.removeEventListener('change', entry.listener);
    else mqList.removeListener(entry.listener);
  } catch {}
  if (entry.matches) {
    removeBodyClass(name);
    entry.handlers?.exit?.();
  }
  registry.delete(name);
}

// Initialize a set of common breakpoints (optional convenience)
export function initDefaults() {
  // small: <640px, md: 640-1023, lg: >=1024
  register('sm', '(max-width:639px)');
  register('md', '(min-width:640px) and (max-width:1023px)');
  register('lg', '(min-width:1024px)');
}

// Destroy all
export function destroyAll() {
  for (const name of Array.from(registry.keys())) unregister(name);
}

// React integration: useSyncExternalStore for consistent SSR-aware behavior.
// subscribe: register a listener function to be called on changes to this breakpoint
function subscribe(name, onStoreChange) {
  // create a small wrapper to listen to the media query changes
  const entry = registry.get(name);
  if (!entry) {
    // If not registered, create it lazily with only match tracking
    register(name, name); // NOP: invalid; better to throw or require registration
    // To be safe, we return a no-op unsubscribe
    return () => {};
  }
  // The entry.listener already calls handleChangeEntry which changes entry.matches.
  // We want to call `onStoreChange` whenever the MQ changes.
  const wrapper = (ev) => onStoreChange();
  // attach wrapper in addition to existing listener
  if (entry.mqList.addEventListener) entry.mqList.addEventListener('change', wrapper);
  else entry.mqList.addListener(wrapper);

  return () => {
    try {
      if (entry.mqList.removeEventListener) entry.mqList.removeEventListener('change', wrapper);
      else entry.mqList.removeListener(wrapper);
    } catch {}
  };
}

// React hook: useBreakpoint('lg') -> boolean
export function useBreakpoint(name) {
  // useSyncExternalStore requires subscribe/getSnapshot/getServerSnapshot
  return useSyncExternalStore(
    (onStoreChange) => {
      // When no registry entry exists, we fallback to window.matchMedia
      let entry = registry.get(name);
      if (!entry) {
        // attempt to create entry from name if name is a mediaQuery string
        try {
          const mqList = window.matchMedia(name);
          // temporary entry (not added to registry)
          const tmp = {
            mqList,
            listener: (ev) => onStoreChange()
          };
          if (mqList.addEventListener) mqList.addEventListener('change', tmp.listener);
          else mqList.addListener(tmp.listener);
          return () => {
            try {
              if (mqList.removeEventListener) mqList.removeEventListener('change', tmp.listener);
              else mqList.removeListener(tmp.listener);
            } catch {}
          };
        } catch {
          return () => {};
        }
      } else {
        // attach an onStoreChange to existing entry
        if (entry.mqList.addEventListener) entry.mqList.addEventListener('change', onStoreChange);
        else entry.mqList.addListener(onStoreChange);
        return () => {
          try {
            if (entry.mqList.removeEventListener) entry.mqList.removeEventListener('change', onStoreChange);
            else entry.mqList.removeListener(onStoreChange);
          } catch {}
        };
      }
    },
    () => {
      // getSnapshot: return current boolean
      return isMatch(name);
    },
    () => {
      // server snapshot fallback
      return false;
    }
  );
}
