/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Context, Serializer } from '@lorisleiva/js-core';

/** Hidden settings for large mints used with off-chain data. */
export type HiddenSettings = {
  /** Asset prefix name */
  name: string;
  /** Shared URI */
  uri: string;
  /** Hash of the hidden settings file */
  hash: Uint8Array;
};

export function getHiddenSettingsSerializer(
  context: Pick<Context, 'serializer' | 'eddsa'>
): Serializer<HiddenSettings> {
  const s = context.serializer;
  return s.struct<HiddenSettings>(
    [
      ['name', s.string],
      ['uri', s.string],
      ['hash', s.bytes],
    ],
    'HiddenSettings'
  );
}
