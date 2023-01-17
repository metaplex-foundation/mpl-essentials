/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  getProgramAddressWithFallback,
  mapSerializer,
} from '@lorisleiva/js-core';

// Accounts.
export type InitializeMultisigInstructionAccounts = {
  multisig: PublicKey;
  rent?: PublicKey;
};

// Arguments.
export type InitializeMultisigInstructionData = {
  discriminator: number;
  m: number;
};

export type InitializeMultisigInstructionArgs = { m: number };

export function getInitializeMultisigInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  InitializeMultisigInstructionArgs,
  InitializeMultisigInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    InitializeMultisigInstructionArgs,
    InitializeMultisigInstructionData,
    InitializeMultisigInstructionData
  >(
    s.struct<InitializeMultisigInstructionData>(
      [
        ['discriminator', s.u8],
        ['m', s.u8],
      ],
      'initializeMultisigInstructionArgs'
    ),
    (value) =>
      ({ discriminator: 2, ...value } as InitializeMultisigInstructionData)
  ) as Serializer<
    InitializeMultisigInstructionArgs,
    InitializeMultisigInstructionData
  >;
}

// Instruction.
export function initializeMultisig(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    programs?: Context['programs'];
  },
  input: InitializeMultisigInstructionAccounts &
    InitializeMultisigInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'splToken',
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  );

  // Multisig.
  keys.push({ pubkey: input.multisig, isSigner: false, isWritable: true });

  // Rent.
  if (input.rent) {
    keys.push({ pubkey: input.rent, isSigner: false, isWritable: false });
  } else {
    keys.push({
      pubkey: context.eddsa.createPublicKey(
        'SysvarRent111111111111111111111111111111111'
      ),
      isSigner: false,
      isWritable: false,
    });
  }

  // Data.
  const data =
    getInitializeMultisigInstructionDataSerializer(context).serialize(input);

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
