/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Program, publicKey } from '@metaplex-foundation/umi';
import {
  getSplAddressLookupTableErrorFromCode,
  getSplAddressLookupTableErrorFromName,
} from '../errors';

export function getSplAddressLookupTableProgram(): Program {
  return {
    name: 'splAddressLookupTable',
    publicKey: publicKey('AddressLookupTab1e1111111111111111111111111'),
    getErrorFromCode(code: number, cause?: Error) {
      return getSplAddressLookupTableErrorFromCode(code, this, cause);
    },
    getErrorFromName(name: string, cause?: Error) {
      return getSplAddressLookupTableErrorFromName(name, this, cause);
    },
    isOnCluster() {
      return true;
    },
  };
}
