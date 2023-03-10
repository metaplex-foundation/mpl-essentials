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
  Option,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
} from '@metaplex-foundation/umi';
import {
  AuthorityType,
  AuthorityTypeArgs,
  getAuthorityTypeSerializer,
} from '../types';

// Accounts.
export type SetAuthorityInstructionAccounts = {
  owned: PublicKey;
  owner: Signer;
  signer: Signer;
};

// Arguments.
export type SetAuthorityInstructionData = {
  discriminator: number;
  authorityType: AuthorityType;
  newAuthority: Option<PublicKey>;
};

export type SetAuthorityInstructionDataArgs = {
  authorityType: AuthorityTypeArgs;
  newAuthority: Option<PublicKey>;
};

export function getSetAuthorityInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<SetAuthorityInstructionDataArgs, SetAuthorityInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    SetAuthorityInstructionDataArgs,
    SetAuthorityInstructionData,
    SetAuthorityInstructionData
  >(
    s.struct<SetAuthorityInstructionData>(
      [
        ['discriminator', s.u8()],
        ['authorityType', getAuthorityTypeSerializer(context)],
        ['newAuthority', s.option(s.publicKey())],
      ],
      { description: 'SetAuthorityInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 6 } as SetAuthorityInstructionData)
  ) as Serializer<SetAuthorityInstructionDataArgs, SetAuthorityInstructionData>;
}

// Instruction.
export function setAuthority(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: SetAuthorityInstructionAccounts & SetAuthorityInstructionDataArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'splToken',
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  );

  // Resolved accounts.
  const ownedAccount = input.owned;
  const ownerAccount = input.owner;
  const signerAccount = input.signer;

  // Owned.
  keys.push({
    pubkey: ownedAccount,
    isSigner: false,
    isWritable: isWritable(ownedAccount, true),
  });

  // Owner.
  signers.push(ownerAccount);
  keys.push({
    pubkey: ownerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(ownerAccount, false),
  });

  // Signer.
  signers.push(signerAccount);
  keys.push({
    pubkey: signerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(signerAccount, false),
  });

  // Data.
  const data =
    getSetAuthorityInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
