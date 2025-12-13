import { testType } from 'type-plus';
import type { App1Context, App1Context2 } from './testing/app1.js';

it('can infer app type from app incubator', () => {
	testType.equal<typeof App1Context, typeof App1Context2>(true);
});
