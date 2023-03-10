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
  checkForIsWritableOverride as isWritable,
  mapSerializer,
} from '@metaplex-foundation/umi';

// Accounts.
export type InitializeMultisig2InstructionAccounts = {
  multisig: PublicKey;
  signer: PublicKey;
};

// Arguments.
export type InitializeMultisig2InstructionData = {
  discriminator: number;
  m: number;
};

export type InitializeMultisig2InstructionDataArgs = { m: number };

export function getInitializeMultisig2InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  InitializeMultisig2InstructionDataArgs,
  InitializeMultisig2InstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    InitializeMultisig2InstructionDataArgs,
    InitializeMultisig2InstructionData,
    InitializeMultisig2InstructionData
  >(
    s.struct<InitializeMultisig2InstructionData>(
      [
        ['discriminator', s.u8()],
        ['m', s.u8()],
      ],
      { description: 'InitializeMultisig2InstructionData' }
    ),
    (value) =>
      ({ ...value, discriminator: 19 } as InitializeMultisig2InstructionData)
  ) as Serializer<
    InitializeMultisig2InstructionDataArgs,
    InitializeMultisig2InstructionData
  >;
}

// Instruction.
export function initializeMultisig2(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: InitializeMultisig2InstructionAccounts &
    InitializeMultisig2InstructionDataArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'splToken',
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  );

  // Resolved accounts.
  const multisigAccount = input.multisig;
  const signerAccount = input.signer;

  // Multisig.
  keys.push({
    pubkey: multisigAccount,
    isSigner: false,
    isWritable: isWritable(multisigAccount, true),
  });

  // Signer.
  keys.push({
    pubkey: signerAccount,
    isSigner: false,
    isWritable: isWritable(signerAccount, false),
  });

  // Data.
  const data =
    getInitializeMultisig2InstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
