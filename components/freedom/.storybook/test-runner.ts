import { toMatchImageSnapshot } from 'jest-image-snapshot'

export function setup() {
	expect.extend({ toMatchImageSnapshot })
}
export async function postRender(page, context) {
	if (!/-skip-snap$/.test(context.id)) {
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot({
			customSnapshotsDir: `${process.cwd()}/__snapshots__/${process.platform}`,
			customSnapshotIdentifier: context.id,
		})
	}
}
