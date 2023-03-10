/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Program, publicKey } from '@metaplex-foundation/umi';
import { getSplMemoErrorFromCode, getSplMemoErrorFromName } from '../errors';

export function getSplMemoProgram(): Program {
  return {
    name: 'splMemo',
    publicKey: publicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'),
    getErrorFromCode(code: number, cause?: Error) {
      return getSplMemoErrorFromCode(code, this, cause);
    },
    getErrorFromName(name: string, cause?: Error) {
      return getSplMemoErrorFromName(name, this, cause);
    },
    isOnCluster() {
      return true;
    },
  };
}
