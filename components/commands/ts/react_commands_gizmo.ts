import { define } from '@just-web/app';
import { type CommandsGizmo, showCommandPalette } from '@just-web/commands';
import type { KeyboardGizmo } from '@just-web/keyboard';
import type { OSGizmo } from '@just-web/os';
import type { ReactGizmo } from '@just-web/react';

export const reactCommandsGizmo = define({
	static: define.require<CommandsGizmo>().optional<KeyboardGizmo>().optional<OSGizmo>().require<ReactGizmo>(),
	async create(ctx) {
		showCommandPalette.connect(ctx);
	},
});
