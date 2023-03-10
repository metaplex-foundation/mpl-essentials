/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Option,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  Serializer,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
} from '@metaplex-foundation/umi';

export type Mint = Account<MintAccountData>;

export type MintAccountData = {
  mintAuthority: Option<PublicKey>;
  supply: bigint;
  decimals: number;
  isInitialized: boolean;
  freezeAuthority: Option<PublicKey>;
};

export type MintAccountDataArgs = {
  mintAuthority: Option<PublicKey>;
  supply: number | bigint;
  decimals: number;
  isInitialized: boolean;
  freezeAuthority: Option<PublicKey>;
};

export function getMintAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<MintAccountDataArgs, MintAccountData> {
  const s = context.serializer;
  return s.struct<MintAccountData>(
    [
      [
        'mintAuthority',
        s.option(s.publicKey(), { prefix: s.u32(), fixed: true }),
      ],
      ['supply', s.u64()],
      ['decimals', s.u8()],
      ['isInitialized', s.bool()],
      [
        'freezeAuthority',
        s.option(s.publicKey(), { prefix: s.u32(), fixed: true }),
      ],
    ],
    { description: 'Mint' }
  ) as Serializer<MintAccountDataArgs, MintAccountData>;
}

export function deserializeMint(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): Mint {
  return deserializeAccount(rawAccount, getMintAccountDataSerializer(context));
}

export async function fetchMint(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<Mint> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  assertAccountExists(maybeAccount, 'Mint');
  return deserializeMint(context, maybeAccount);
}

export async function safeFetchMint(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<Mint | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  return maybeAccount.exists ? deserializeMint(context, maybeAccount) : null;
}

export async function fetchAllMint(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<Mint[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'Mint');
    return deserializeMint(context, maybeAccount);
  });
}

export async function safeFetchAllMint(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<Mint[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) =>
      deserializeMint(context, maybeAccount as RpcAccount)
    );
}

export function getMintGpaBuilder(
  context: Pick<Context, 'rpc' | 'serializer' | 'programs'>
) {
  const s = context.serializer;
  const programId = context.programs.getPublicKey(
    'splToken',
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      mintAuthority: Option<PublicKey>;
      supply: number | bigint;
      decimals: number;
      isInitialized: boolean;
      freezeAuthority: Option<PublicKey>;
    }>({
      mintAuthority: [
        0,
        s.option(s.publicKey(), { prefix: s.u32(), fixed: true }),
      ],
      supply: [36, s.u64()],
      decimals: [44, s.u8()],
      isInitialized: [45, s.bool()],
      freezeAuthority: [
        46,
        s.option(s.publicKey(), { prefix: s.u32(), fixed: true }),
      ],
    })
    .deserializeUsing<Mint>((account) => deserializeMint(context, account))
    .whereSize(82);
}

export function getMintSize(): number {
  return 82;
}
