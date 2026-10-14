import { describe, expect, it, vi } from 'vitest';
import { getEntityActionsConfig, getUndoManager } from '../private-selectors';

describe( 'getUndoManager', () => {
	it( 'returns the undo manager held in state', () => {
		const undoManager = {
			addRecord: vi.fn(),
			hasRedo: vi.fn(),
			hasUndo: vi.fn(),
			redo: vi.fn(),
			undo: vi.fn(),
		};

		expect( getUndoManager( { undoManager } ) ).toBe( undoManager );
	} );
} );

describe( 'getEntityActionsConfig', () => {
	it( 'returns undefined until the actions of the entity are received', () => {
		const state = { entityActionsConfigs: {} };

		expect(
			getEntityActionsConfig( state, 'postType', 'page' )
		).toBeUndefined();
	} );

	it( 'returns the received actions of the entity', () => {
		const config = { kind: 'postType', name: 'page', actions: [] };
		const state = { entityActionsConfigs: { postType: { page: config } } };

		expect( getEntityActionsConfig( state, 'postType', 'page' ) ).toBe(
			config
		);
		expect(
			getEntityActionsConfig( state, 'postType', 'post' )
		).toBeUndefined();
	} );
} );
