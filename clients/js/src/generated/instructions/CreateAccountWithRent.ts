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
export type CreateAccountWithRentInstructionAccounts = {
  /** The account paying for the storage */
  payer?: Signer;
  /** The account being created */
  newAccount: Signer;
  /** System program */
  systemProgram?: PublicKey;
};

// Arguments.
export type CreateAccountWithRentInstructionData = {
  discriminator: number;
  space: bigint;
  programId: PublicKey;
};

export type CreateAccountWithRentInstructionArgs = {
  space: number | bigint;
  programId: PublicKey;
};

export function getCreateAccountWithRentInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  CreateAccountWithRentInstructionArgs,
  CreateAccountWithRentInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    CreateAccountWithRentInstructionArgs,
    CreateAccountWithRentInstructionData,
    CreateAccountWithRentInstructionData
  >(
    s.struct<CreateAccountWithRentInstructionData>(
      [
        ['discriminator', s.u8],
        ['space', s.u64],
        ['programId', s.publicKey],
      ],
      'CreateAccountWithRentInstructionArgs'
    ),
    (value) =>
      ({ discriminator: 0, ...value } as CreateAccountWithRentInstructionData)
  ) as Serializer<
    CreateAccountWithRentInstructionArgs,
    CreateAccountWithRentInstructionData
  >;
}

// Instruction.
export function createAccountWithRent(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    payer: Context['payer'];
    programs?: Context['programs'];
  },
  input: CreateAccountWithRentInstructionAccounts &
    CreateAccountWithRentInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'mplSystemExtras',
    'SysExL2WDyJi9aRZrXorrjHJut3JwHQ7R9bTyctbNNG'
  );

  // Payer.
  if (input.payer) {
    signers.push(input.payer);
    keys.push({
      pubkey: input.payer.publicKey,
      isSigner: true,
      isWritable: true,
    });
  } else {
    signers.push(context.payer);
    keys.push({
      pubkey: context.payer.publicKey,
      isSigner: true,
      isWritable: true,
    });
  }

  // New Account.
  signers.push(input.newAccount);
  keys.push({
    pubkey: input.newAccount.publicKey,
    isSigner: true,
    isWritable: true,
  });

  // System Program.
  if (input.systemProgram) {
    keys.push({
      pubkey: input.systemProgram,
      isSigner: false,
      isWritable: false,
    });
  } else {
    keys.push({
      pubkey: getProgramAddressWithFallback(
        context,
        'splSystem',
        '11111111111111111111111111111111'
      ),
      isSigner: false,
      isWritable: false,
    });
  }

  // Data.
  const data =
    getCreateAccountWithRentInstructionDataSerializer(context).serialize(input);

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}