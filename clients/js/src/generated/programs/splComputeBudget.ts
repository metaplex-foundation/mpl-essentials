/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Program, publicKey } from '@metaplex-foundation/umi';
import {
  getSplComputeBudgetErrorFromCode,
  getSplComputeBudgetErrorFromName,
} from '../errors';

export function getSplComputeBudgetProgram(): Program {
  return {
    name: 'splComputeBudget',
    publicKey: publicKey('ComputeBudget111111111111111111111111111111'),
    getErrorFromCode(code: number, cause?: Error) {
      return getSplComputeBudgetErrorFromCode(code, this, cause);
    },
    getErrorFromName(name: string, cause?: Error) {
      return getSplComputeBudgetErrorFromName(name, this, cause);
    },
    isOnCluster() {
      return true;
    },
  };
}
