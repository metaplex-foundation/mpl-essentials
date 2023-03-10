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
export type CloseTokenInstructionAccounts = {
  account: PublicKey;
  destination: PublicKey;
  owner: Signer;
};

// Arguments.
export type CloseTokenInstructionData = { discriminator: number };

export type CloseTokenInstructionDataArgs = {};

export function getCloseTokenInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<CloseTokenInstructionDataArgs, CloseTokenInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    CloseTokenInstructionDataArgs,
    CloseTokenInstructionData,
    CloseTokenInstructionData
  >(
    s.struct<CloseTokenInstructionData>([['discriminator', s.u8()]], {
      description: 'CloseTokenInstructionData',
    }),
    (value) => ({ ...value, discriminator: 9 } as CloseTokenInstructionData)
  ) as Serializer<CloseTokenInstructionDataArgs, CloseTokenInstructionData>;
}

// Instruction.
export function closeToken(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: CloseTokenInstructionAccounts
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
  const destinationAccount = input.destination;
  const ownerAccount = input.owner;

  // Account.
  keys.push({
    pubkey: accountAccount,
    isSigner: false,
    isWritable: isWritable(accountAccount, true),
  });

  // Destination.
  keys.push({
    pubkey: destinationAccount,
    isSigner: false,
    isWritable: isWritable(destinationAccount, true),
  });

  // Owner.
  signers.push(ownerAccount);
  keys.push({
    pubkey: ownerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(ownerAccount, false),
  });

  // Data.
  const data = getCloseTokenInstructionDataSerializer(context).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
