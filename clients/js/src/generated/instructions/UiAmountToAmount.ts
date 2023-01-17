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
export type UiAmountToAmountInstructionAccounts = {
  mint: PublicKey;
};

// Arguments.
export type UiAmountToAmountInstructionData = {
  discriminator: number;
  uiAmount: bigint;
};

export type UiAmountToAmountInstructionArgs = { uiAmount: number | bigint };

export function getUiAmountToAmountInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  UiAmountToAmountInstructionArgs,
  UiAmountToAmountInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    UiAmountToAmountInstructionArgs,
    UiAmountToAmountInstructionData,
    UiAmountToAmountInstructionData
  >(
    s.struct<UiAmountToAmountInstructionData>(
      [
        ['discriminator', s.u8],
        ['uiAmount', s.u64],
      ],
      'uiAmountToAmountInstructionArgs'
    ),
    (value) =>
      ({ discriminator: 24, ...value } as UiAmountToAmountInstructionData)
  ) as Serializer<
    UiAmountToAmountInstructionArgs,
    UiAmountToAmountInstructionData
  >;
}

// Instruction.
export function uiAmountToAmount(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    programs?: Context['programs'];
  },
  input: UiAmountToAmountInstructionAccounts & UiAmountToAmountInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'splToken',
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  );

  // Mint.
  keys.push({ pubkey: input.mint, isSigner: false, isWritable: false });

  // Data.
  const data =
    getUiAmountToAmountInstructionDataSerializer(context).serialize(input);

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
