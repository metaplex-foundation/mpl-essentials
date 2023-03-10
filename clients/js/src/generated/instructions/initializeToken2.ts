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
  publicKey,
} from '@metaplex-foundation/umi';

// Accounts.
export type InitializeToken2InstructionAccounts = {
  account: PublicKey;
  mint: PublicKey;
  rent?: PublicKey;
};

// Arguments.
export type InitializeToken2InstructionData = {
  discriminator: number;
  owner: PublicKey;
};

export type InitializeToken2InstructionDataArgs = { owner: PublicKey };

export function getInitializeToken2InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  InitializeToken2InstructionDataArgs,
  InitializeToken2InstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    InitializeToken2InstructionDataArgs,
    InitializeToken2InstructionData,
    InitializeToken2InstructionData
  >(
    s.struct<InitializeToken2InstructionData>(
      [
        ['discriminator', s.u8()],
        ['owner', s.publicKey()],
      ],
      { description: 'InitializeToken2InstructionData' }
    ),
    (value) =>
      ({ ...value, discriminator: 16 } as InitializeToken2InstructionData)
  ) as Serializer<
    InitializeToken2InstructionDataArgs,
    InitializeToken2InstructionData
  >;
}

// Instruction.
export function initializeToken2(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: InitializeToken2InstructionAccounts &
    InitializeToken2InstructionDataArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'splToken',
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  );

  // Resolved accounts.
  const accountAccount = input.account;
  const mintAccount = input.mint;
  const rentAccount =
    input.rent ?? publicKey('SysvarRent111111111111111111111111111111111');

  // Account.
  keys.push({
    pubkey: accountAccount,
    isSigner: false,
    isWritable: isWritable(accountAccount, true),
  });

  // Mint.
  keys.push({
    pubkey: mintAccount,
    isSigner: false,
    isWritable: isWritable(mintAccount, false),
  });

  // Rent.
  keys.push({
    pubkey: rentAccount,
    isSigner: false,
    isWritable: isWritable(rentAccount, false),
  });

  // Data.
  const data =
    getInitializeToken2InstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
