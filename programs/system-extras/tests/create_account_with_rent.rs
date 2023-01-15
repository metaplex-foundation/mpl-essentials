#![cfg(feature = "test-bpf")]

pub mod utils;

use crate::utils::{airdrop, get_account, program_test, send_transaction};
use assert_matches::*;
use mpl_system_extras::instruction::create_account_with_rent_instruction;
use solana_program::{
    instruction::{AccountMeta, Instruction},
    pubkey::Pubkey,
    rent::Rent,
    sysvar::Sysvar,
};
use solana_sdk::{
    signature::{Keypair, Signer},
    transaction::Transaction,
};
use solana_validator::test_validator::*;

#[tokio::test]
async fn test_it_creates_an_account_with_minimum_rent_from_given_space() {
    // Given a brand new account keypair.
    let mut context = program_test().start_with_context().await;
    let new_account = Keypair::new();

    // When we create an account with 42 bytes of space, without specifying
    // the lamports, using the "CreateAccountWithRent" instruction.
    let transaction = Transaction::new_signed_with_payer(
        &[create_account_with_rent_instruction(
            &context.payer.pubkey(),
            &new_account.pubkey(),
            42,
            context.program_id,
        )],
        Some(&context.payer.pubkey()),
        &[&context.payer],
        context.last_blockhash,
    );
    send_transaction(&mut context, transaction).await?;

    // Then the right account space was allocated.
    let account = get_account(&mut context, &new_account.pubkey()).await;
    assert_eq!(account.data.len(), 42);

    // And the right amount of lamports was transferred to the new account.
    let rent = Rent::get()?;
    assert_eq!(account.lamports, rent.minimum_balance(42));

    // And the right program owner was set.
    assert_eq!(account.owner, context.program_id);
}

#[tokio::test]
async fn test_creating_an_account_with_rent_debit_lamports_from_the_payer() {
    // Given a brand new account keypair and a payer with 10 SOL.
    let mut context = program_test().start_with_context().await;
    let new_account = Keypair::new();
    let payer = Keypair::new();
    airdrop(&mut context, &payer.pubkey(), 10_000_000_000).await?;

    // When we create an account with rent using that payer.
    let transaction = Transaction::new_signed_with_payer(
        &[create_account_with_rent_instruction(
            &payer.pubkey(),
            &new_account.pubkey(),
            42,
            context.program_id,
        )],
        // Note that we let the context payer pay for the transaction fee
        // so that we can assert the exact amount of lamports transferred.
        Some(&context.payer.pubkey()),
        &[&payer.payer],
        context.last_blockhash,
    );
    send_transaction(&mut context, transaction).await?;

    // Then the right amount of lamports was transferred to the new account.
    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(42);
    let account = get_account(&mut context, &new_account.pubkey()).await;
    assert_eq!(account.lamports, rent_lamports);

    // And the same amount of lamports was debited from the payer.
    let payer_account = get_account(&mut context, &payer.pubkey()).await;
    assert_eq!(payer_account.lamports, 10_000_000_000 - rent_lamports);
}

// Test: Not enough funds.
