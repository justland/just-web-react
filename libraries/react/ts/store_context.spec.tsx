import { a } from 'assertron';
import React from 'react';
import { create } from 'react-test-renderer';
import { describe, it } from 'vitest';
import { createStoreContext, useStoreContext } from './index.js';

describe(`${useStoreContext.name}()`, () => {
	it('throws if Context.Provider is not fill in first', () => {
		const Context = createStoreContext();
		const Comp = () => {
			a.throws(
				// biome-ignore lint/correctness/useHookAtTopLevel: TODO
				() => useStoreContext(Context, (s) => s),
				(err) => err.message === 'Context.Provider must be used before using useStoreContext()'
			);

			return null;
		};
		create(<Comp />);
	});
});
